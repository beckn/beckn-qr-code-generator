# Stage 1: Build the client
FROM node:14 AS client-builder

# Set the working directory for the client
WORKDIR /app/client

# Copy package.json and package-lock.json for the client
COPY package*.json ./

# Install client dependencies
RUN npm install

# Copy the rest of the client application source code
COPY ./ ./

# Stage 2: Build the server
FROM node:14 AS server-builder

# Set the working directory for the server
WORKDIR /app/server

# Copy package.json and package-lock.json for the server
COPY server/package*.json ./

# Install server dependencies
RUN npm install

# Copy the rest of the server application source code
COPY server/ ./

# Stage 3: Create the final image
FROM node:14

# Set the working directory in the container
WORKDIR /app

# Copy the built client and server from their respective build stages
COPY --from=client-builder /app/client ./client
COPY --from=server-builder /app/server ./server

# Expose the port your server will listen on (adjust as needed)
EXPOSE 3000

# Start your server (modify the command as needed)
CMD ["npm", "run", "devel"]
