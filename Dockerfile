
# Use the official Nginx image as base
FROM nginx:latest

# Remove default nginx website
RUN rm -rf /usr/share/nginx/html/*

# Copy all application files to nginx html directory
COPY . /usr/share/nginx/html/

# Create a custom nginx configuration
RUN echo 'server { \
    listen 8010; \
    server_name localhost; \
    root /usr/share/nginx/html; \
    index index.html index.htm; \
}' > /etc/nginx/conf.d/default.conf

# Expose port 8010
EXPOSE 8010

# Start Nginx when the container launches
CMD ["nginx", "-g", "daemon off;"]