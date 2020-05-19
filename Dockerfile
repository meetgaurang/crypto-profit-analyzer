FROM node:12.16.2-alpine3.11
WORKDIR /usr/app
COPY package*.json ./
RUN npm install
COPY . .
CMD ["npm", "run", "start"]
