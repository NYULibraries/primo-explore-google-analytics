FROM quay.io/nyulibraries/chromium_headless_node:10.15.1-chromium_71.0.3578.98

ENV INSTALL_PATH /app/

# Install node_modules with yarn
ADD package.json yarn.lock /tmp/
RUN cd /tmp && yarn install --frozen-lockfile --ignore-scripts \
  && mkdir -p $INSTALL_PATH \
  && cd $INSTALL_PATH \
  && cp -R /tmp/node_modules $INSTALL_PATH \
  && rm -r /tmp/* && yarn cache clean

WORKDIR ${INSTALL_PATH}

COPY . .