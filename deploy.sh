#!/bin/bash

# 更新系统并安装基础工具
apt-get update
apt-get upgrade -y
apt-get install -y curl git

# 安装Docker
curl -fsSL https://get.docker.com | bash -s docker
systemctl start docker
systemctl enable docker

# 安装Docker Compose
curl -L "https://github.com/docker/compose/releases/download/v2.24.5/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
chmod +x /usr/local/bin/docker-compose

# 创建项目目录
mkdir -p /www/zhiliao
cd /www/zhiliao

# 克隆项目代码
git clone https://github.com/zlforward/SmartChatAI.git .

# 启动服务
docker-compose up -d

# 输出结果
echo "部署完成！"
echo "请访问 http://服务器IP 查看网站。" 