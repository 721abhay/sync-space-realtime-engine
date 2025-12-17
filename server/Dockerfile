FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

# Build TypeScript
RUN npm run build || npx tsc

EXPOSE 3001

CMD ["node", "dist/index.js"]
