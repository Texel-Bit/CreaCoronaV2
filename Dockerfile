# Stage 1: Build the application
FROM node:16.14.0 AS build

# Set the working directory
WORKDIR /CreaCoronaFront

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy project files into the docker image
COPY . .

# Build the application
RUN npm run build

# Stage 2: Serve the application with Apache
FROM httpd:2.4

# Copy the build output to replace the default Apache content directory
COPY --from=build /CreaCoronaFront/build /usr/local/apache2/htdocs/

# Expose port 80 to the outside once the container has launched
EXPOSE 80
