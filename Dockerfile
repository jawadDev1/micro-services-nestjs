FROM node:22-alpine

WORKDIR /workspace

RUN corepack enable

# Copy dependency manifests first
COPY package.json .
COPY pnpm-lock.yaml .
COPY pnpm-workspace.yaml .
COPY nx.json .
COPY tsconfig.base.json .
COPY tsconfig.json .

# Install dependencies
RUN pnpm install

# Copy the rest of the workspace
COPY . .

ARG APP
ENV APP=$APP

# Build the requested app
RUN pnpm nx build @org/${APP}

CMD ["sh", "-c", "node /workspace/${APP}/dist/main.js"]
