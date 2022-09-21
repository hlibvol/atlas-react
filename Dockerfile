FROM node:16-alpine

WORKDIR /opt/app

ENV NODE_ENV development

COPY package*.json ./
COPY .npmrc ./

RUN npm install

COPY . /opt/app

RUN npm run bootstrap -- --scope atlas-beacon -- --force
RUN npm run build -- --scope atlas-beacon

FROM node:16-alpine

COPY --from=0 /opt/app/examples/fineFoods/admin/antd/build /opt/app
WORKDIR /opt/app/

ENV NODE_ENV=production

RUN npm install -g serve

CMD serve -l 5000
