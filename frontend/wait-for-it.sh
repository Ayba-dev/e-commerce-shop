#!/bin/bash

# Скрипт для ожидания доступности хоста и порта.

# Проверка, что переданы параметры (host и порт)
if [ "$#" -lt 2 ]; then
  echo "Usage: $0 <host>:<port> <command>"
  exit 1
fi

hostport=$1
shift
cmd="$@"

# Разбираем host и port
host=$(echo $hostport | cut -d: -f1)
port=$(echo $hostport | cut -d: -f2)

# Цикл ожидания
echo "Waiting for $host:$port to be available..."

# Ожидаем, пока сервис не станет доступен
until nc -z $host $port; do
  echo "$host:$port is unavailable - sleeping"
  sleep 2
done

echo "$host:$port is available - executing command"
exec $cmd
