'use strict'

const beanifyPlugin = require('beanify-plugin')
const Redis = require('ioredis')

module.exports = beanifyPlugin(async (beanify, options, next) => {
  let client = options.client || null

  if (beanify.hasDecorator('redis')) {
    return next(new Error('beanify-redis has already been registered'))
  }
  beanify.decorate('redis', {})

  if (!client) {
    const urls = options.urls ? options.urls.split(';') : []
    for (let url of urls) {
      const namespace = `db${url.substr(url.lastIndexOf('/') + 1)}` || 'db0'
      if (url) {
        if (beanify.redis[namespace]) {
          return next(new Error(`Redis '${namespace}' instance namespace has already been registered`))
        }
        try {
          const client = new Redis(url, options.redis || {})
          await client.connect()
          beanify.redis[namespace] = client
          beanify.$log.info(`Redis ${namespace} connection!`)
          beanify.addHook('onClose', function() {
            beanify.$log.info(`Redis ${namespace} connection closed!`)
            return client.quit()
          })
        } catch (error) {
          throw error
        }
      }
    }
  } else {
    if (options.namespace) {
      beanify.redis[namespace] = client
    } else {
      beanify.redis = client
    }
  }
  beanify.$log.info('redis ready....')
  next()
}, {
  urls: 'redis://127.0.0.1:6379/0'
})
