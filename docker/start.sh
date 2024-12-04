#!/bin/bash
pnpm install
pnpm build-only
cp -r /app/dist/* /usr/share/nginx/html
nginx -g "daemon off;"
