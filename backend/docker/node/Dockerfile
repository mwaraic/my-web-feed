# Use the official Node.js image from Docker Hub
FROM node:slim

WORKDIR /app
# change second '.' to '/app'
COPY . /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Specify the command to run your application
CMD ["npm", "start"]
