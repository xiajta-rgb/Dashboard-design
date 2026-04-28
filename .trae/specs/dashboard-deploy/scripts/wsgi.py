#!/usr/bin/env python3
"""
Dashboard Design WSGI Configuration for PythonAnywhere
This WSGI file serves the Vite React static build
"""

import os
import sys

# Add your project directory to the path
path = '/home/desgin/Dashboard-design'
if path not in sys.path:
    sys.path.insert(0, path)

# Set the dist directory
dist_dir = '/home/desgin/Dashboard-design/dist'

def application(environ, start_response):
    # Get the path requested
    path_info = environ.get('PATH_INFO', '/')

    # Handle static files
    if path_info.startswith('/static/') or path_info.startswith('/assets/'):
        # Static file request
        static_path = path_info.lstrip('/')
        file_path = os.path.join(dist_dir, static_path)

        if os.path.isfile(file_path):
            # Determine content type
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
            # File not found
            status = '404 Not Found'
            response_headers = [('Content-Type', 'text/plain')]
            start_response(status, response_headers)
            return [b'File not found: ' + path_info.encode()]

    # For all other requests (including /), serve index.html
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
        return [b'index.html not found in dist directory']
