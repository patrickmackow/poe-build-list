FROM node:alpine

COPY . /app
WORKDIR /app
ENV NODE_ENV production
RUN npm install pm2@latest -g \
    && npm run prod
EXPOSE 3000

CMD ["sh", "entrypoint.sh"]