const tap = require('tap')
const Beanify = require('beanify')

const beanifyOpts = {
  nats: {
    url: 'nats://127.0.0.1:4222',
    user: 'bimgroup',
    pass: 'commonpwd'
  }
}

const beanify = new Beanify({
  nats: Object.assign({}, beanifyOpts.nats)
})

beanify.register(require('../index'), {
  serializedObject: true,
  host: '127.0.0.1',
  port: 6379,
  db: 0
})

function init(redis){
  redis.del('hash')
  redis.hset('hash', 'test1', 2)
  redis.hset('hash', 'integer', 200)
}

beanify.ready(() => {
  console.log('beanify ready....')
  const { redis } = beanify
  init(redis)

  tap.test('这是一个关于Redis hash类型的(hset)测试', (t) => {
    t.plan(1)
    redis.hset('hash', 'test', { name: 'name', value: 'value' }).then(res => {
      t.equal(res, 1, 'check 这是一个关于Redis hash类型的(hset)测试')
    }, err => {
      t.error(err)
    })
  })

  tap.test('这是一个关于Redis hash类型的(hget)测试', (t) => {
    t.plan(1)
    redis.hget('hash', 'test').then(res => {
      t.equal(res, '{"name":"name","value":"value"}', 'check 这是一个关于Redis hash类型的(hget)测试')
    }, err => {
      t.error(err)
    })
  })

  tap.test('这是一个关于Redis hash类型的(hgetall)测试', (t) => {
    t.plan(1)
    redis.hgetall('hash').then(res => {
      t.ok(res, 'check 这是一个关于Redis hash类型的(hgetall)测试')
    }, err => {
      t.error(err)
    })
  })

  tap.test('这是一个关于Redis hash类型的(hdel)测试', (t) => {
    t.plan(1)
    redis.hdel('hash', 'test1').then(res => {
      t.equal(res, 1, 'check 这是一个关于Redis hash类型的(hdel)测试')
    }, err => {
      t.error(err)
    })
  })

  tap.test('这是一个关于Redis hash类型的(hmset)测试', (t) => {
    t.plan(1)
    redis.hmset('hash', {name: 'name',pass: 'password'}).then(res => {
      t.equal(res, 'OK', 'check 这是一个关于Redis hash类型的(hmset)测试')
    }, err => {
      t.error(err)
    })
  })

  tap.test('这是一个关于Redis hash类型的(hmget)测试', (t) => {
    t.plan(1)
    redis.hmget('hash', ['name', 'pass']).then(res => {
      t.equal(res.length, 2, 'check 这是一个关于Redis hash类型的(hmget)测试')
    }, err => {
      t.error(err)
    })
  })

  tap.test('这是一个关于Redis hash类型的(hlen)测试', (t) => {
    t.plan(1)
    redis.hlen('hash').then(res => {
      t.equal(res, 4, 'check 这是一个关于Redis hash类型的(hlen)测试')
    }, err => {
      t.error(err)
    })
  })

  tap.test('这是一个关于Redis hash类型的(hexists)测试', (t) => {
    t.plan(1)
    redis.hexists('hash', 'test').then(res => {
      t.equal(res, 1, 'check 这是一个关于Redis hash类型的(hexists)测试')
    }, err => {
      t.error(err)
    })
  })

  tap.test('这是一个关于Redis hash类型的(hkeys)测试', (t) => {
    t.plan(1)
    redis.hkeys('hash').then(res => {
      t.equal(res.length, 4, 'check 这是一个关于Redis hash类型的(hkeys)测试')
    }, err => {
      t.error(err)
    })
  })

  tap.test('这是一个关于Redis hash类型的(hvals)测试', (t) => {
    t.plan(1)
    redis.hvals('hash').then(res => {
      t.equal(res.length, 4, 'check 这是一个关于Redis hash类型的(hvals)测试')
    }, err => {
      t.error(err)
    })
  })

  tap.test('这是一个关于Redis hash类型的(hincrby)测试', (t) => {
    t.plan(1)
    redis.hincrby('hash', 'integer', 300).then(res => {
      t.equal(res, 500, 'check 这是一个关于Redis hash类型的(hincrby)测试')
    }, err => {
      t.error(err)
    })
  })

  tap.test('这是一个关于Redis hash类型的(hincrbyfloat)测试', (t) => {
    t.plan(1)
    redis.hincrbyfloat('hash', 'integer', 20.1314).then(res => {
      t.ok(res.indexOf('520.1313') >= 0, 'check 这是一个关于Redis hash类型的(hincrbyfloat)测试')
    }, err => {
      t.error(err)
    })
  })

  tap.tearDown(() => {
    console.log("tap.tearDown")
    beanify.close()
  })
})
