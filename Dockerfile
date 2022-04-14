FROM node

ENV NODE_ENV=dev
RUN npm install -g wrangler@beta

VOLUME /app
WORKDIR /app

CMD npm install && wrangler pages dev ./public -k BeerUsers --live-reload --binding AUD="DEV"
