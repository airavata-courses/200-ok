# Use Node v8 as the base imge.
FROM node:8

# Add everything in the current directory to our image, in the 'app' folder.
ADD . /app

# Install dependencies
RUN cd /app; \
    npm install

# Run our app.
CMD ["node", "/app/app.js"]