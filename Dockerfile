# Билд-контейнер
FROM node:18 as build

WORKDIR /app

# Устанавливаем зависимости
RUN npm install

# Копируем исходный код
COPY . .

# Выполняем сборку
RUN npm build 

# Запускаем проект 
CMD [ "node", "dist/src/main.js" ]
