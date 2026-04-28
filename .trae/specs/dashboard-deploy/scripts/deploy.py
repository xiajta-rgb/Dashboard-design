#!/usr/bin/env python3
"""
Dashboard Design Deploy - 部署到 PythonAnywhere
用户: desgin
仓库: git@github.com:xiajta-rgb/Dashboard-design.git

自动执行完整部署流程，无需用户确认
构建在本地完成后，直接上传 dist 目录到云端
"""

import subprocess
import time
import requests
import sys
import json
import base64
from pathlib import Path

USERNAME = 'desgin'
API_TOKEN = 'e44f1998049185639e0038c951e64081658b7eb8'
HOST = 'www.pythonanywhere.com'
WEBAPP_DOMAIN = 'desgin.pythonanywhere.com'
WSGI_FILE_PATH = '/var/www/desgin_pythonanywhere_com_wsgi.py'
HEADERS = {'Authorization': f'Token {API_TOKEN}'}

SCRIPT_DIR = Path(__file__).parent.resolve()
PROJECT_ROOT = SCRIPT_DIR.parent.parent.parent.parent

STATIC_WSGI_CONTENT = '''#!/usr/bin/env python3
"""
Dashboard Design WSGI Configuration for PythonAnywhere
"""

import os
import sys

path = '/home/desgin/Dashboard-design'
if path not in sys.path:
    sys.path.insert(0, path)

dist_dir = '/home/desgin/Dashboard-design/dist'

def application(environ, start_response):
    path_info = environ.get('PATH_INFO', '/')

    if path_info.startswith('/static/') or path_info.startswith('/assets/'):
        static_path = path_info.lstrip('/')
        file_path = os.path.join(dist_dir, static_path)

        if os.path.isfile(file_path):
            if file_path.endswith('.js'):
                content_type = 'application/javascript'
            elif file_path.endswith('.css'):
                content_type = 'text/css'
            elif file_path.endswith('.html'):
                content_type = 'text/html'
            elif file_path.endswith('.png'):
                content_type = 'image/png'
            elif file_path.endswith('.svg'):
                content_type = 'image/svg+xml'
            elif file_path.endswith('.json'):
                content_type = 'application/json'
            else:
                content_type = 'application/octet-stream'

            with open(file_path, 'rb') as f:
                content = f.read()

            status = '200 OK'
            response_headers = [
                ('Content-Type', content_type),
                ('Content-Length', str(len(content)))
            ]
            start_response(status, response_headers)
            return [content]
        else:
            status = '404 Not Found'
            response_headers = [('Content-Type', 'text/plain')]
            start_response(status, response_headers)
            return [b'File not found']

    index_path = os.path.join(dist_dir, 'index.html')
    if os.path.isfile(index_path):
        with open(index_path, 'r', encoding='utf-8') as f:
            content = f.read()

        status = '200 OK'
        response_headers = [
            ('Content-Type', 'text/html; charset=utf-8'),
            ('Content-Length', str(len(content)))
        ]
        start_response(status, response_headers)
        return [content.encode('utf-8')]
    else:
        status = '500 Internal Server Error'
        response_headers = [('Content-Type', 'text/plain')]
        start_response(status, response_headers)
        return [b'index.html not found']
'''

def run_cmd(cmd, cwd=None, shell=True):
    cwd_str = str(cwd) if cwd else str(PROJECT_ROOT)
    result = subprocess.run(
        cmd, shell=shell, cwd=cwd_str,
        capture_output=True, text=True,
        encoding='utf-8', errors='replace'
    )
    return result.returncode, result.stdout, result.stderr

def step1_build():
    print("\n" + "="*50)
    print("Step 1/4: Build Frontend")
    print("="*50)

    dist_dir = PROJECT_ROOT / "dist"
    src_dir = PROJECT_ROOT / "src"

    need_build = True
    if dist_dir.exists() and src_dir.exists():
        dist_mtime = dist_dir.stat().st_mtime
        src_mtime = max(f.stat().st_mtime for f in src_dir.rglob("*") if f.is_file())
        if dist_mtime > src_mtime:
            print("[SKIP] dist already exists and is up to date")
            need_build = False

    if need_build:
        print("[INFO] Running npm run build...")
        code, stdout, stderr = run_cmd("npm run build", cwd=str(PROJECT_ROOT))
        if code != 0:
            print(f"[X] Build failed!\nstdout: {stdout}\nstderr: {stderr}")
            return False
        print("[OK] Build successful")
    return True

def step2_git_push():
    print("\n" + "="*50)
    print("Step 2/4: Git Commit and Push")
    print("="*50)

    code, stdout, stderr = run_cmd("git status --porcelain")
    if not stdout.strip():
        print("[SKIP] No uncommitted changes, skip commit")
        return True

    print("[INFO] Executing git add -A && git commit && git push...")
    code, stdout, stderr = run_cmd("git add -A")
    if code != 0:
        print(f"[X] git add failed: {stderr}")
        return False

    timestamp = time.strftime("%Y-%m-%d %H:%M:%S")
    code, stdout, stderr = run_cmd(f'git commit -m "Deploy: {timestamp}"')
    if code != 0:
        print(f"[X] git commit failed: {stderr}")
        return False
    print(f"[OK] Commit successful: Deploy: {timestamp}")

    run_cmd("git pull --rebase 2>&1 || true")
    _, current_branch, _ = run_cmd("git rev-parse --abbrev-ref HEAD 2>&1 || echo 'main'")
    current_branch = current_branch.strip() or "main"
    code, stdout, stderr = run_cmd(f"git push origin {current_branch}")
    if code != 0:
        print(f"[X] git push failed: {stderr}")
        return False
    print("[OK] Push successful")
    return True

def step3_cloud_deploy():
    print("\n" + "="*50)
    print("Step 3/4: Deploy to Cloud (Upload dist)")
    print("="*50)

    original_wsgi = backup_original_wsgi()
    if not original_wsgi:
        print("[X] WSGI backup failed")
        return False

    if not clear_remote_directory():
        print("[X] Failed to clear remote directory")
        return False

    if not upload_dist_directory():
        print("[X] Failed to upload dist directory")
        return False

    if not upload_static_wsgi():
        print("[X] Failed to upload static file WSGI")
        return False

    if not reload_webapp():
        print("[!] Reload failed")
        return False

    print("[OK] Cloud deployment completed")
    return True

def step4_verify():
    print("\n" + "="*50)
    print("Step 4/4: Verify Website")
    print("="*50)

    url = "https://desgin.pythonanywhere.com/"
    max_retries = 3
    retry_delay = 10

    for attempt in range(max_retries):
        try:
            response = requests.get(url, timeout=15)
            content_type = response.headers.get('Content-Type', '')
            text = response.text

            if response.status_code == 200 and 'text/html' in content_type and '<html' in text:
                print(f"[OK] Website verification successful!")
                print(f"     URL: {url}")
                print(f"     Status: {response.status_code}")
                print(f"     Content-Type: {content_type}")
                return True
            else:
                print(f"[X] Verification failed (attempt {attempt+1}/{max_retries})")
                print(f"     Status: {response.status_code}")
                print(f"     Content-Type: {content_type}")
                print(f"     Contains <html>: {'Yes' if '<html' in text else 'No'}")
        except Exception as e:
            print(f"[X] Request failed (attempt {attempt+1}/{max_retries}): {e}")

        if attempt < max_retries - 1:
            print(f"[INFO] Retrying in {retry_delay} seconds...")
            time.sleep(retry_delay)

    print("[X] Verification failed, please check website status")
    return False

def backup_original_wsgi():
    url = f'https://{HOST}/api/v0/user/{USERNAME}/files/path{WSGI_FILE_PATH}'
    try:
        resp = requests.get(url, headers=HEADERS, timeout=15)
        resp.raise_for_status()
        print("[OK] WSGI backup successful")
        return resp.text
    except Exception as e:
        print(f"[X] WSGI backup failed: {e}")
        return None

def clear_remote_directory():
    print("[INFO] Clearing remote Dashboard-design directory...")
    url = f'https://{HOST}/api/v0/user/{USERNAME}/files/path/home/desgin/Dashboard-design/'
    try:
        resp = requests.delete(url, headers=HEADERS, timeout=30)
        if resp.status_code in [200, 204, 404]:
            print("[OK] Remote directory cleared")
            return True
        else:
            print(f"[X] Failed to clear directory: {resp.status_code}")
            return False
    except Exception as e:
        print(f"[X] Failed to clear directory: {e}")
        return False

def upload_dist_directory():
    print("[INFO] Uploading dist directory to remote...")
    dist_dir = PROJECT_ROOT / "dist"

    if not dist_dir.exists():
        print(f"[X] Local dist directory not found: {dist_dir}")
        return False

    for root, dirs, files in os.walk(dist_dir):
        for file in files:
            local_path = Path(root) / file
            relative_path = local_path.relative_to(dist_dir)
            remote_path = f'/home/desgin/Dashboard-design/dist/{relative_path}'

            with open(local_path, 'rb') as f:
                content = f.read()

            if not upload_file(remote_path, content):
                print(f"[X] Failed to upload: {relative_path}")
                return False

            print(f"  Uploaded: {relative_path}")

    print("[OK] All files uploaded")
    return True

def upload_file(remote_path, content):
    url = f'https://{HOST}/api/v0/user/{USERNAME}/files/path{remote_path}'
    try:
        encoded_content = base64.b64encode(content).decode('utf-8')
        resp = requests.post(
            url,
            headers=HEADERS,
            json={'content': encoded_content, 'encoding': 'base64'},
            timeout=60
        )
        if resp.status_code in [200, 201]:
            return True
        else:
            print(f"Upload failed: {resp.status_code} - {resp.text}")
            return False
    except Exception as e:
        print(f"Upload error: {e}")
        return False

def upload_static_wsgi():
    url = f'https://{HOST}/api/v0/user/{USERNAME}/files/path{WSGI_FILE_PATH}'
    try:
        resp = requests.post(url, headers=HEADERS, files={'content': STATIC_WSGI_CONTENT}, timeout=15)
        resp.raise_for_status()
        print("[OK] Static file serving WSGI uploaded")
        return True
    except Exception as e:
        print(f"[X] Static WSGI upload failed: {e}")
        return False

def reload_webapp():
    url = f'https://{HOST}/api/v0/user/{USERNAME}/webapps/{WEBAPP_DOMAIN}/reload/'
    try:
        resp = requests.post(url, headers=HEADERS, timeout=90)
        resp.raise_for_status()
        print("[OK] Web App reload successful!")
        return True
    except Exception as e:
        print(f"[X] Web App reload failed: {e}")
        return False

def main():
    print("\n" + "#"*50)
    print("# Dashboard Design - Deploy to PythonAnywhere")
    print("#"*50)
    print(f"# User: {USERNAME}")
    print(f"# Domain: {WEBAPP_DOMAIN}")
    print(f"# Repo: git@github.com:xiajta-rgb/Dashboard-design.git")
    print("#"*50)

    if not step1_build():
        print("\n[X] Build failed, stopping deployment")
        sys.exit(1)

    if not step2_git_push():
        print("\n[X] Git commit/push failed, stopping deployment")
        sys.exit(1)

    if not step3_cloud_deploy():
        print("\n[X] Cloud deployment failed")
        sys.exit(1)

    if not step4_verify():
        print("\n[X] Website verification failed")
        sys.exit(1)

    print("\n" + "#"*50)
    print("# Deployment Complete!")
    print("#"*50)
    print(f"# Visit: https://{WEBAPP_DOMAIN}/")
    print("#"*50)

if __name__ == "__main__":
    import os
    main()
