# Используем официальный Node.js образ как базовый
FROM node:18

# Устанавливаем рабочую директорию внутри контейнера
WORKDIR /app

# Копируем package.json и package-lock.json в контейнер
COPY backend/package*.json ./


# Устанавливаем зависимости
RUN npm install


# Копируем все остальные файлы из папки backend в контейнер
COPY backend/ .

EXPOSE 5000

# Запускаем сервер
CMD ["npm", "start"]
