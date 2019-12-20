'use strict'

const beanifyPlugin = require('beanify-plugin')
const Redis = require('ioredis')
module.exports = beanifyPlugin((beanify, options, next) => {
  const namespace = options.namespace
  delete options.namespace

  if (options.serializedObject) {
    Object.prototype.toString = function () {
      try {
        return JSON.stringify(this)
      } catch{ }
    }
  }

  let client = options.client || null

  if (namespace) {
    if (!beanify.redis) {
      beanify.decorate('redis', {})
    }

    if (beanify.redis[namespace]) {
      return next(new Error(`Redis '${namespace}' instance namespace has already been registered`))
    }

    const closeNamedInstance = (ctx, done) => {
      console.log('Redis connection closed!')
      beanify.redis[namespace].quit(done)
    }

    if (!client) {
      try {
        client = new Redis(options)
      } catch (err) {
        return next(err)
      }

      client.connect(() => {
        console.log('Redis connection!')
      })

      beanify.addHook('onClose', closeNamedInstance)
    }

    beanify.redis[namespace] = client
  } else {
    if (beanify.redis) {
      return next(new Error('fastify-redis has already been registered'))
    } else {
      if (!client) {
        try {
          client = new Redis(options)
        } catch (err) {
          return next(err)
        }
        beanify.addHook('onClose', (ctx, done) => {
          console.log('Redis connection closed!')
          client.quit(done)
        })

        client.connect(() => {
          console.log('Redis connection!')
        })
      }

      beanify.decorate('redis', client)
    }
  }

  next()
}, {
  beanify: '>=1.0.11',
  name: require('./package.json').name,
  options: {
    serializedObject: false,
    host: '127.0.0.1'
  }
})
