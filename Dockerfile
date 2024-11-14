FROM node:16-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

COPY . .

RUN npm run build

FROM nginx:alpine

COPY --from=builder /app/dist/exchange_rate /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]