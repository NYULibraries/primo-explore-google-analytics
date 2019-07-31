FROM quay.io/nyulibraries/chromium_headless_node:10-chromium_latest
ENV INSTALL_PATH /app/

# Install node_modules with yarn
ADD package.json /tmp/
RUN cd /tmp && yarn install --frozen-lockfile --ignore-scripts \
  && mkdir -p $INSTALL_PATH \
  && cd $INSTALL_PATH \
  && cp -R /tmp/node_modules $INSTALL_PATH \
  && rm -r /tmp/* && yarn cache clean

WORKDIR ${INSTALL_PATH}

COPY . .