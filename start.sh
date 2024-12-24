#!/bin/bash

# 创建日志目录
mkdir -p logs

# 检查是否已经在运行
if [ -f ".pid" ]; then
    pid=$(cat .pid)
    if ps -p $pid > /dev/null 2>&1; then
        echo "服务已经在运行中 (PID: $pid)"
        exit 1
    else
        rm .pid
    fi
fi

# 设置环境变量
export NODE_ENV=production
export PORT=3000

# 启动服务
echo "正在启动 AI 工程开发助手..."
nohup npm run dev > logs/app.log 2>&1 & 

# 保存 PID
echo $! > .pid

# 等待几秒检查服务是否成功启动
sleep 3

if ps -p $(cat .pid) > /dev/null; then
    echo "服务启动成功！"
    echo "- 访问地址: http://localhost:3000"
    echo "- 日志文件: logs/app.log"
    echo "- PID: $(cat .pid)"
else
    echo "服务启动失败，请检查日志文件 logs/app.log"
    rm .pid
    exit 1
fi 