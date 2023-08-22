FROM node:alpine

WORKDIR /user/src/newApp/app

COPY package.json .
COPY package-lock.json .
RUN npm ci

COPY . .
RUN npm install @prisma/client
RUN npx prisma generate


CMD ["npm", "start"]
