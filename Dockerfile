# Simple Dockerfile to run Expo dev server
FROM node:18

WORKDIR /app

# Install expo-cli globally
RUN npm install -g expo-cli

# Copy project
COPY . .

# Install dependencies
RUN npm install

EXPOSE 19000 19001 19002

CMD ["npm", "start"]
