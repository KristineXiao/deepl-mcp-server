# Dockerfile for DeepL MCP Server
FROM node:20-alpine  

# Create app directory
WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm install --production

# Bundle app source
COPY . .

# Run HTTP server
CMD ["node", "http-server.js"]
