FROM node:18-alpine AS build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build --prod

FROM nginx:alpine

COPY --from=build /app/dist/exchange_rate /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
