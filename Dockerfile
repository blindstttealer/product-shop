# ---- Build stage ----
FROM node:18-alpine AS builder
WORKDIR /app

# Копируем package.json и package-lock.json для кэширования зависимостей
COPY package*.json ./
RUN npm ci

# Копируем весь исходный код
COPY . .

# Опционально: передаём API URL для продакшена
ARG REACT_APP_API_URL
ENV REACT_APP_API_URL=${REACT_APP_API_URL}
ENV NODE_ENV=production

# Собираем production build
RUN npm run build:prod

# ---- Production stage ----
FROM nginx:stable-alpine AS runtime
RUN rm -rf /usr/share/nginx/html/*

# Копируем готовые статические файлы
COPY --from=builder /app/build /usr/share/nginx/html

# Копируем кастомный конфиг nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
