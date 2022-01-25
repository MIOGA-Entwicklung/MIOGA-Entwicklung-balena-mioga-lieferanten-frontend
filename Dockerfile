ARG LAUFZEITUMGEBUNG="build"
ARG API_BASEURL="http://db907f3a697198fae10dc93ba55e3d75.balena-devices.com:8080"

#Note after Building the first Step the Container container will be Deleted
# Nginx will be the last Container with only dist/Liferanten File
FROM node:16 as build-step

ENV APIBASEURL=${API_BASEURL}

USER root

WORKDIR /home/node/app

COPY --chown=root:root ./package.json ./

RUN npm install


COPY --chown=root:root ./ ./

COPY --chown=root:root . /app

RUN  npm run build --env=balenafrontend


#final stage
FROM nginx:latest
EXPOSE 80
COPY --from=build-step /home/node/app/dist/Lieferanten/ /usr/share/nginx/html




