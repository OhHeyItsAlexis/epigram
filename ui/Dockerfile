FROM node:latest

WORKDIR /app/client

ENV PATH /app/client/node_modules/.bin:$PATH

COPY package.json /app/client/package.json
RUN npm install
RUN npm install -g @angular/cli@latest

COPY . /app/client

CMD ["ng","serve","--host","0.0.0.0"]
