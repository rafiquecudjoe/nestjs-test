FROM node:15.4

WORKDIR /app

COPY package.json .

RUN npm install --production

COPY . .

RUN npm install -g @nestjs/cli

RUN npm run build

EXPOSE 3000



