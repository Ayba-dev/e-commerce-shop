# Используем официальный Node.js образ как базовый
FROM node:18

# Устанавливаем рабочую директорию внутри контейнера
WORKDIR /app

# Копируем package.json и package-lock.json в контейнер
COPY frontend/package*.json ./

# Устанавливаем зависимости
RUN npm install

# Указываем порт (например, 3000 для дев-сервера)
EXPOSE 3000


CMD ["npm", "start"]



