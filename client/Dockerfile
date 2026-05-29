FROM node:25.9.0-alpine

WORKDIR /app

# Copy package files
COPY package.json package-lock.json ./

# Install dependencies
RUN npm ci

# Copy application code
COPY . .

EXPOSE 5173

CMD ["npm", "run", "dev"]
