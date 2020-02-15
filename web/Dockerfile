FROM nginx:alpine

COPY ./nginx.prod.conf /etc/nginx/nginx.conf    
WORKDIR /srv
CMD ["nginx", "-g", "daemon off;"]

