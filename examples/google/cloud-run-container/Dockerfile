# Use Node.js base image
FROM node:22-slim

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install --production

# Copy the rest of the app
COPY . .

# Expose port
EXPOSE 8080

# Start the app
CMD ["node", "index.js"]
