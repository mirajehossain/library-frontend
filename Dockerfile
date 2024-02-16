#base image
FROM node:18 as build

WORKDIR /usr/src/app
COPY package*.json ./

RUN npm install
COPY . .
RUN npm run build


FROM node:18 as prod
WORKDIR /usr/src/app

COPY --from=build /usr/src/app/build ./build

RUN npm install -g serve
CMD ["serve", "-s", "build"]




