FROM node:16

# Create app directory
WORKDIR /APP

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./
RUN npm install

# exposes port 3000
EXPOSE 3000

CMD ["npm", "run", "start"]
