const Beanify = require('beanify')
const Redis = require('./index')
const beanify = Beanify({})

beanify
  .register(Redis, {
    client: 'redis test'
  })
  .ready(e => {
    e && beanify.$log.error(e.message)
    beanify.print()
    beanify.$log.info(beanify.redis)
  })
