FROM node:12
RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app
WORKDIR /usr/src/app
COPY ["package.json", "package-lock.json*", "./"]
USER node
RUN npm install
COPY --chown=node:node . .
EXPOSE 3001
CMD ["npm", "start"]
