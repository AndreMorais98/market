# Use an official Node.js runtime as the base image
FROM node:18.12

# Set the working directory in the container
WORKDIR /src/

# Copy the package.json and package-lock.json files to the container
COPY . /src/

# Build the server
RUN npm install

# Expose the port that the server will listen on
EXPOSE 3000

# Start the server
CMD [ "npm", "start" ]