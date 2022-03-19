FROM node:12-slim

ENV USER_EMAIL=""
ENV USER_PASSWORD=""
ENV TESTS_TIMEOUT=2000
ENV AVAILABLE=""
ENV AVAILABILITY_FREQUENCY=""
ENV NOT_AVAILABLE=""
ENV NOT_AVAILABLE_CUSTOM_DATE=""

ADD . /app
RUN  apt-get update \
     && apt-get install -y wget gnupg ca-certificates --no-install-recommends \
     && wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - \
     && sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list' \
     && apt-get update \
     && apt-get install -y google-chrome-stable --no-install-recommends \
     && rm -rf /var/lib/apt/lists/* \
     && wget --quiet https://raw.githubusercontent.com/vishnubob/wait-for-it/master/wait-for-it.sh -O /usr/sbin/wait-for-it.sh \
     && chmod +x /usr/sbin/wait-for-it.sh

WORKDIR "/app"
RUN npm install

CMD ["npm", "run", "test"]