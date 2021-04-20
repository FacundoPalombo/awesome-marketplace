# this is an answer file for Assignment
# move it up a directory for it to work

FROM node:15.12.0-alpine3.10 as base
LABEL org.opencontainers.image.authors=facundo.palombo@gmail.com
LABEL org.opencontainers.image.title="Awesome Marketplace - Frontend"
LABEL org.opencontainers.image.licenses=MIT

ENV NODE_ENV=production

EXPOSE 8080

ENV PORT 8080

WORKDIR /app

COPY --chown=node:node package*.json ./

RUN npm config list

RUN npm ci \
    && npm cache clean --force

FROM base as dev
ENV NODE_ENV=development

RUN apk update -qq && \
    apk add -q curl inotify-tools

RUN npm config list

RUN npm install --only=development \
    && npm cache clean --force

CMD ["npm", "run", "dev"]

FROM dev as test

COPY . .

RUN npm audit

RUN npm run coverage

# Run some tests like sonar or code smells scanner

#RUN npm run specs

USER root

FROM test as pre-prod

RUN rm -rf ./tests && rm -rf ./node_modules

FROM base as prod

COPY --from=pre-prod /app /app

CMD ["npm", "run", "build"]

FROM nginx:1.19.9-alpine as deploy

RUN rm -rf /etc/nginx/conf.d

COPY conf.d /etc/nginx

COPY --from=prod /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]RUN chown -Rh $user:$user /project
