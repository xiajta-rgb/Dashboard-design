---
name: "dashboard-deploy"
description: "执行仪表盘设计项目的完整部署流程：构建前端 → Git提交推送 → 云端部署到PythonAnywhere → 验证网站。当用户请求部署时自动执行。"
---

# Dashboard Design Deploy Pipeline

**完整自动化部署流程，无需用户确认**

## Pipeline Steps（自动顺序执行）

### Step 1/4: Build Frontend（构建前端）
```bash
npm run build
```
- 产物输出到 `dist`
- **判断是否需要执行**：检查 `dist` 是否存在且为最新（对比 `src` 修改时间）
- 如果 `dist` 已存在且比源码新，**可跳过**此步骤

### Step 2/4: Git Commit and Push（提交推送）
```bash
git add -A && git commit -m "Deploy: $(date '+%Y-%m-%d %H:%M:%S')" && git push
```
- **判断是否需要执行**：检查 `git status` 是否有未提交更改
- 如果没有未提交更改，**可跳过**此步骤

### Step 3/4: Deploy to Cloud（云端部署）
执行部署脚本（自动完成以下操作）：
1. 备份原始 WSGI 文件
2. 替换 WSGI 为临时部署脚本
3. 重载 WebApp
4. 等待 60 秒让部署完成
5. 再次重载 WebApp
6. 恢复原始 WSGI

### Step 4/4: Verify（验证）
验证 `https://desgin.pythonanywhere.com/` 返回 `text/html` 且包含 `<html>` 标签

## Quick Start

```bash
# 完整部署（构建 + 提交 + 云端部署 + 验证）
python .trae/specs/dashboard-deploy/scripts/deploy.py

# 或直接运行
python .trae/specs/voc-deploy/scripts/deploy_desgin.py
```

## 部署配置

- **用户**: desgin
- **Token**: e44f1998049185639e0038c951e64081658b7eb8
- **域名**: desgin.pythonanywhere.com
- **仓库**: git@github.com:xiajta-rgb/Dashboard-design.git
- **WSGI路径**: /var/www/desgin_pythonanywhere_com_wsgi.py

## 部署脚本位置

- `.trae/specs/dashboard-deploy/scripts/deploy.py` - 主部署脚本
- `.trae/specs/voc-deploy/scripts/deploy_desgin.py` - desgin用户专用脚本

## Usage

当用户说"部署"或"开始部署"时，自动执行完整部署流程：
1. 检查是否需要构建
2. 检查是否需要Git提交推送
3. 执行云端部署
4. 验证网站可用性

## 部署流程说明

### 云端部署逻辑

1. **备份WSGI**: 通过 PythonAnywhere API 获取当前 WSGI 内容
2. **替换WSGI**: 上传临时部署脚本，该脚本会：
   - 删除旧的项目目录
   - 从 GitHub clone 最新代码
   - 执行 npm install && npm run build
3. **重载WebApp**: 触发 PythonAnywhere 重载
4. **等待**: 等待 60 秒让部署完成
5. **恢复WSGI**: 将原始 WSGI 内容写回
6. **验证**: 检查网站是否正常返回 HTML

### 验证规则

验证必须满足以下条件：
- HTTP Status Code = 200
- Content-Type 包含 `text/html`
- 响应内容包含 `<html>` 标签

如果验证失败，会自动重试最多 3 次，每次间隔 10 秒。

## 常见问题

### 部署后返回 500 错误

**可能原因**：
1. WSGI 配置不正确
2. 静态文件路径错误
3. npm 构建失败

**排查方法**：
1. 检查 `/home/desgin/deploy_log.txt` 查看部署日志
2. 检查 `/home/desgin/deploy_error.txt` 查看错误信息
3. 在 PythonAnywhere Web 控制台查看错误日志

### 部署后返回空白页

**可能原因**：
1. dist 目录不存在或为空
2. WSGI 没有正确指向静态文件

**排查方法**：
1. 确认构建产物在 `/home/desgin/Dashboard-design/dist`
2. 检查 WSGI 配置的静态文件路径

### Git clone 失败

**可能原因**：
1. SSH 密钥未配置
2. 仓库地址错误

**解决方案**：
使用 HTTPS 格式的仓库地址，或确保 SSH 密钥已添加到 GitHub
