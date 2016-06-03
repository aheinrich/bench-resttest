# To build and run with Docker
# Less than perfect, but it works.
#
#                    ##        .            
#              ## ## ##       ==            
#           ## ## ## ##      ===            
#       /""""""""""""""""\___/ ===        
#  ~~~ {~~ ~~~~ ~~~ ~~~~ ~~ ~ /  ===- ~~~   
#       \______ o          __/            
#         \    \        __/             
#          \____\______/                
#
# Best practices: https://github.com/nodejs/docker-node/blob/master/docs/BestPractices.md

FROM node:argon

# Expose the web port
EXPOSE 8000

# - Create the directory
# - Create a new user 'nodejs'
# - Add 'nodejs' user permissions to various directories

RUN mkdir -p /resttest /home/nodejs && \
    groupadd -r nodejs && \
    useradd -r -g nodejs -d /home/nodejs -s /sbin/nologin nodejs && \
    chown -R nodejs:nodejs /home/nodejs

# Set the working directory to our project
WORKDIR /resttest

# Copy the project basics into the working directory
COPY package.json typings.json /resttest/

# Run the NPM command to install project dependencies
RUN npm install --unsafe-perm=true

# Copy the project contents into the working directory 
COPY . /resttest

# Ensure the working directory has the correct user permissions
RUN chown -R nodejs:nodejs /resttest

# Change use to our non-privledged account
USER nodejs


# Run the NPM command to build the server and then start the server
CMD [ "npm", "start"]