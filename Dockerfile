FROM node:16 AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install --production
COPY . .

FROM node:16-slim AS runtime
WORKDIR /app
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app .
EXPOSE 3000
CMD ["npm","start"]