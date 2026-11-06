FROM node:22-bookworm-slim AS builder

WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1

COPY package.json package-lock.json ./
COPY apps/web/package.json ./apps/web/package.json
COPY apps/api/package.json ./apps/api/package.json
RUN npm ci --no-fund

COPY apps/web ./apps/web
RUN npm run build --workspace @dsai/web

FROM nginx:stable-alpine AS runner

RUN sed -i '/^user /d; s|^pid .*;|pid /tmp/nginx.pid;|' /etc/nginx/nginx.conf \
    && rm -f /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/apps/web/out /usr/share/nginx/html

USER nginx
EXPOSE 8080
ENTRYPOINT ["nginx"]
CMD ["-g", "daemon off;"]
