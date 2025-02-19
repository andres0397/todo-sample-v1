# Step 1: Use a smaller base image for the build stage
FROM node:16-alpine AS build

# Step 2: Set the working directory
WORKDIR /usr/src/app

# Step 3: Copy package.json and package-lock.json
COPY package*.json ./

# Step 4: Install dependencies
RUN npm install

# Step 5: Copy the rest of the application files
COPY . .

# Step 6: Build the Next.js project
RUN npm run build

# Step 7: Create a new stage for the runtime environment
FROM node:16-alpine

# Step 8: Set the working directory for the runtime
WORKDIR /usr/src/app

# Step 9: Copy only the build output from the previous stage
COPY --from=build /usr/src/app/.next ./public
COPY --from=build /usr/src/app/public ./public

# Step 10: Set environment variable for production
ENV NODE_ENV=production

# Step 11: Expose the port (adjust based on your application)
EXPOSE 3000

# Step 12: Command to run the application
CMD ["npm", "start"]
