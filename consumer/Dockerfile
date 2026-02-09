FROM node:24-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build


FROM node:24-alpine

WORKDIR /app

RUN apk add --no-cache dumb-init

RUN addgroup -g 1001 -S nodejs \
    && adduser -S nestjs -u 1001

COPY package*.json ./
RUN npm ci --only=production \
    && npm cache clean --force

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/proto ./proto

RUN chown -R nestjs:nodejs /app
USER nestjs

EXPOSE 50051

ENTRYPOINT ["dumb-init", "--"]
CMD ["node", "dist/main.js"]
