FROM node:22

RUN apt-get update && apt-get install -y git && git clone https://github.com/niyantracir/mycrudApp.git /app

WORKDIR /app

RUN npm install

CMD ["npm","start"]
