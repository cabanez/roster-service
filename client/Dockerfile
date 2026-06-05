FROM node:25.9.0-alpine

# ENV VITE_API_URL=http://localhost:5000
# ENV VITE_TAC_OP_API_URL=http://tactical-optimization:8000

WORKDIR /app

# Copy package files
COPY package.json package-lock.json ./

# Install dependencies
RUN npm ci

# Copy application code
COPY . .

EXPOSE 5173

CMD ["npm", "run", "dev"]
