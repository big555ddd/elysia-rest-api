# Use an official Node.js image as a base
FROM node:18-bullseye

# Install Bun
RUN curl -fsSL https://bun.sh/install | bash

# Set the working directory
WORKDIR /app

# Add Bun to PATH
ENV PATH="/root/.bun/bin:$PATH"

# Copy package files and install dependencies
COPY package.json bun.lockb /app/
RUN bun install

# Copy the rest of the application code
COPY . .

# Expose the application port
EXPOSE 9090

# Start the application
CMD ["bun", "index.ts"]
