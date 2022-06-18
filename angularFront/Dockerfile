FROM node:lts as build
WORKDIR /app

RUN npm install -g @angular/cli

COPY package.json .
RUN npm install

COPY . .
#RUN npm run build --prod
EXPOSE 4200
CMD npm run start
