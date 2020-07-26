FROM node:14-alpine as builder

WORKDIR /app

COPY . .
RUN npm install --silent
RUN npm install --silent -g typescript
RUN npm run build
RUN npm prune --silent --production


FROM node:lts-alpine AS production
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
EXPOSE 3000
CMD ["node", "dist/main.js"]
