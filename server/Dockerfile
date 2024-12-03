FROM node:22.11.0

WORKDIR /app

COPY . .

COPY package.json /src
RUN npm install
RUN npm run build
RUN npx prisma generate

EXPOSE 3333

CMD ["npm", "run", "start"]
