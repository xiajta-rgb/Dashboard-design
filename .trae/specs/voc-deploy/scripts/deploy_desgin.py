#!/usr/bin/env python3
"""
Dashboard Design Deploy - 部署到 PythonAnywhere
用户: desgin
仓库: git@github.com:xiajta-rgb/Dashboard-design.git
"""

import subprocess
import time
import requests
import sys
import argparse
from pathlib import Path

USERNAME = 'desgin'
API_TOKEN = 'e44f1998049185639e0038c951e64081658b7eb8'
HOST = 'www.pythonanywhere.com'
WEBAPP_DOMAIN = 'desgin.pythonanywhere.com'
WSGI_FILE_PATH = '/var/www/desgin_pythonanywhere_com_wsgi.py'
HEADERS = {'Authorization': f'Token {API_TOKEN}'}

SCRIPT_DIR = Path(__file__).parent.resolve()
PROJECT_ROOT = SCRIPT_DIR.parent.parent.parent

def run_cmd(cmd, cwd=None, shell=True):
    cwd_str = str(cwd) if cwd else str(PROJECT_ROOT)
    result = subprocess.run(
        cmd, shell=shell, cwd=cwd_str,
        capture_output=True, text=True,
        encoding='utf-8', errors='replace'
    )
    return result.returncode, result.stdout, result.stderr

def step1_git_push():
    print("\n" + "="*50)
    print("Step 1/4: Git Commit and Push（提交推送）")
    print("="*50)

    code, stdout, stderr = run_cmd("git status --porcelain")
    if not stdout.strip():
        print("[SKIP] 没有未提交更改，跳过提交推送")
        return True

    print("[INFO] 执行 git add -A && git commit && git push ...")
    code, stdout, stderr = run_cmd("git add -A")
    if code != 0:
        print(f"[X] git add 失败: {stderr}")
        return False

    timestamp = time.strftime("%Y-%m-%d %H:%M:%S")
    code, stdout, stderr = run_cmd(f'git commit -m "Deploy: {timestamp}"')
    if code != 0:
        print(f"[X] git commit 失败: {stderr}")
        return False
    print(f"[OK] 提交成功: Deploy: {timestamp}")

    run_cmd("git pull --rebase 2>&1 || true")
    _, current_branch, _ = run_cmd("git rev-parse --abbrev-ref HEAD 2>&1 || echo 'main'")
    current_branch = current_branch.strip() or "main"
    code, stdout, stderr = run_cmd(f"git push origin {current_branch}")
    if code != 0:
        print(f"[X] git push 失败: {stderr}")
        return False
    print("[OK] 推送成功")
    return True

def step2_cloud_deploy():
    print("\n" + "="*50)
    print("Step 2/4: Deploy to Cloud（云端部署）")
    print("="*50)

    original_wsgi = backup_original_wsgi()
    if not original_wsgi:
        print("[X] WSGI备份失败")
        return False

    if not replace_wsgi_with_deploy_script(original_wsgi):
        print("[X] WSGI替换失败")
        return False

    if not reload_webapp():
        print("[!] 重载失败，但继续等待...")
        return False

    print("等待 60 秒让部署完成...")
    time.sleep(60)

    if not reload_webapp():
        print("[!] 第二次重载失败，请检查 /home/desgin/deploy_log.txt")
        return False

    print("[OK] 云端部署完成")
    return True

def step3_verify():
    print("\n" + "="*50)
    print("Step 3/4: Verify（验证网站）")
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
                print(f"[OK] 网站验证成功!")
                print(f"     URL: {url}")
                print(f"     Status: {response.status_code}")
                print(f"     Content-Type: {content_type}")
                return True
            else:
                print(f"[X] 验证失败 (尝试 {attempt+1}/{max_retries})")
                print(f"     Status: {response.status_code}")
                print(f"     Content-Type: {content_type}")
                print(f"     响应包含 <html>: {'是' if '<html' in text else '否'}")
        except Exception as e:
            print(f"[X] 请求失败 (尝试 {attempt+1}/{max_retries}): {e}")

        if attempt < max_retries - 1:
            print(f"[INFO] {retry_delay}秒后重试...")
            time.sleep(retry_delay)

    print("[X] 验证失败，请检查网站状态")
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

def replace_wsgi_with_deploy_script(original_wsgi_content):
    temp_wsgi = f'''
import subprocess
import os

try:
    if os.path.exists("/home/desgin/Dashboard-design"):
        result = subprocess.run(
            "rm -rf Dashboard-design",
            shell=True,
            cwd="/home/desgin",
            capture_output=True,
            text=True,
            timeout=30
        )
        with open("/home/desgin/deploy_log.txt", "w", encoding="utf-8") as f:
            f.write(f"Step1 - Remove old dir\\n")
            f.write(f"Return code: {{result.returncode}}\\n")
            f.write(f"Stdout: {{result.stdout}}\\n")
            f.write(f"Stderr: {{result.stderr}}\\n")

    result = subprocess.run(
        "git clone git@github.com:xiajta-rgb/Dashboard-design.git",
        shell=True,
        cwd="/home/desgin",
        capture_output=True,
        text=True,
        timeout=120
    )
    with open("/home/desgin/deploy_log.txt", "a", encoding="utf-8") as f:
        f.write(f"Step2 - Clone repo\\n")
        f.write(f"Return code: {{result.returncode}}\\n")
        f.write(f"Stdout: {{result.stdout}}\\n")
        f.write(f"Stderr: {{result.stderr}}\\n")

    result = subprocess.run(
        "cd Dashboard-design && npm install && npm run build",
        shell=True,
        cwd="/home/desgin",
        capture_output=True,
        text=True,
        timeout=180
    )
    with open("/home/desgin/deploy_log.txt", "a", encoding="utf-8") as f:
        f.write(f"Step3 - Build\\n")
        f.write(f"Return code: {{result.returncode}}\\n")
        f.write(f"Stdout: {{result.stdout}}\\n")
        f.write(f"Stderr: {{result.stderr}}\\n")
    print("Deployment command completed")
except Exception as e:
    with open("/home/desgin/deploy_error.txt", "a", encoding="utf-8") as f:
        f.write(f"Deployment failed: {{str(e)}}\\n")

try:
    with open("{WSGI_FILE_PATH}", "w", encoding="utf-8") as f:
        f.write("""{original_wsgi_content}""")
    print("Original WSGI restored")
except Exception as e:
    with open("/home/desgin/deploy_error.txt", "a", encoding="utf-8") as f:
        f.write(f"WSGI restore failed: {{str(e)}}\\n")

def application(environ, start_response):
    status = "200 OK"
    response_headers = [("Content-Type", "text/plain; charset=utf-8")]
    start_response(status, response_headers)
    return [b"Automated deployment triggered! Check /home/desgin/deploy_log.txt for details."]
'''
    url = f'https://{HOST}/api/v0/user/{USERNAME}/files/path{WSGI_FILE_PATH}'
    try:
        resp = requests.post(url, headers=HEADERS, files={'content': temp_wsgi}, timeout=15)
        resp.raise_for_status()
        print("[OK] Temp WSGI uploaded")
        return True
    except Exception as e:
        print(f"[X] WSGI replace failed: {e}")
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
    print("# Dashboard Design - 部署到 PythonAnywhere")
    print("#"*50)
    print(f"# 用户: {USERNAME}")
    print(f"# 仓库: git@github.com:xiajta-rgb/Dashboard-design.git")
    print("#"*50)

    confirm = input("\n确认执行云端部署？(y/N): ").strip().lower()
    if confirm != 'y':
        print("[X] 部署已取消")
        sys.exit(0)

    if not step1_git_push():
        print("\n[X] Git提交推送失败，停止部署")
        sys.exit(1)

    if not step2_cloud_deploy():
        print("\n[X] 云端部署失败")
        sys.exit(1)

    if not step3_verify():
        print("\n[X] 网站验证失败")
        sys.exit(1)

    print("\n" + "#"*50)
    print("# 部署完成!")
    print("#"*50)
    print("# 访问 https://desgin.pythonanywhere.com/")

if __name__ == "__main__":
    main()
