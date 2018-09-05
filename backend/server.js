const Koa     = require('koa');
const koaJson = require('koa-json'); // JSON pretty-printed response middleware. Also converts node object streams to binary. https://github.com/koajs/json
const koaBody = require('koa-body'); // A full-featured koa body parser middleware. https://github.com/dlau/koa-body
const {json}  = require('./config/env'); // settings for koaJson
const config = require('./config/env');
const logger = require('./core/libs/Logger')(module);

const app = new Koa();

app.context.config = config; // add settings to context

app.use(koaJson(json));
app.use(koaBody());

require('./routes')(app); // connect routes to app

// The "parent" is the module that caused the script to be interpreted (and cached), if any
if (!module.parent) {
  app.listen(process.env.PORT, () => {
    logger.info(`App running on port: ${process.env.PORT}`);
  });
}

module.exports = app;