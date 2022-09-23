FROM node:16-alpine as build

WORKDIR /app

ENV NODE_PATH=/node_modules
ENV PATH=$PATH:/app/node_modules/.bin

# install app dependencies
COPY package.json ./
COPY yarn.lock ./
RUN yarn install --network-timeout 1000000 --silent
COPY . ./
RUN npm run build

# production environment
FROM nginx:1.17
ARG NODE_ENV
COPY --from=build /app/build/ /usr/share/nginx/html
COPY --from=build /app/nginx/${NODE_ENV}.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]