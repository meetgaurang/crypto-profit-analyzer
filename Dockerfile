#Step.1: Build
FROM node:12.16.2-alpine3.11
WORKDIR /usr/buildstep
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run test:nowatch
RUN npm run build

#Step.2: Deploy 'build' dir on nginx server
FROM nginx:1.18.0-alpine
EXPOSE 80
COPY --from=0 /usr/buildstep/build /usr/share/nginx/html
