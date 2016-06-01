# To build and run with Docker:
#
#  $ docker build -t ng2-quickstart .
#  $ docker run -it --rm -p 3000:3000 -p 3001:3001 ng2-quickstart
#
FROM node:latest

RUN mkdir -p /resttest /home/nodejs && \
    groupadd -r nodejs && \
    useradd -r -g nodejs -d /home/nodejs -s /sbin/nologin nodejs && \
    chown -R nodejs:nodejs /home/nodejs

WORKDIR /resttest
COPY package.json typings.json /resttest/
RUN npm install --unsafe-perm=true

COPY . /resttest
RUN chown -R nodejs:nodejs /quickstart
USER nodejs

CMD npm gulp compile

CMD npm gulp server:start