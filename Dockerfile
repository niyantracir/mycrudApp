FROM ubuntu:22.04 AS provider

RUN apt-get update && \
    apt-get install -y --no-install-recommends git ca-certificates && \
    git clone https://github.com/niyantracir/mycrudApp.git /app && \
    apt-get clean && rm -rf /var/lib/apt/lists/*

# Stage 2: Install Node.js dependencies
FROM node:22-alpine AS builder

WORKDIR /app

COPY --from=provider /app .

RUN npm install --omit=dev && npm cache clean --force

# Stage 3: Runtime image
FROM node:22-alpine

WORKDIR /app

COPY --from=builder /app .

EXPOSE 3000

CMD ["npm", "start"]
