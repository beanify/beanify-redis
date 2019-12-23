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

function init(redis) {
  redis.del('test')
  redis.set('test', 'value')
}

beanify.ready(() => {
  console.log('beanify ready....')
  const { redis } = beanify
  init(redis)

  tap.test('这是一个关于Redis 命令的(exists)测试', (t) => {
    t.plan(1)
    redis.exists('test').then(res => {
      t.equal(res, 1, 'check 这是一个关于Redis 命令的(exists)测试')
    }, err => {
      t.error(err)
    })
  })

  tap.test('这是一个关于Redis 命令的(expire)测试', (t) => {
    t.plan(1)
    redis.expire('test', 1).then(res => {
      setTimeout(() => {
        redis.get('test').then(res => {
          t.equal(res, null, 'check 这是一个关于Redis 命令的(expire)测试')
        }, err => {
          t.error(err)
        })
      }, 1500)
    }, err => {
      t.error(err)
    })
  })

  tap.test('这是一个关于Redis 命令的(pexpire)测试', (t) => {
    init(redis)
    t.plan(1)
    redis.pexpire('test', 1000).then(res => {
      setTimeout(() => {
        redis.get('test').then(res => {
          t.equal(res, null, 'check 这是一个关于Redis 命令的(pexpire)测试')
        }, err => {
          t.error(err)
        })
      }, 1500)
    }, err => {
      t.error(err)
    })
  })


  tap.test('这是一个关于Redis 命令的(expireat)测试', (t) => {
    init(redis)
    const timestamp = (new Date()).valueOf()
    t.plan(1)
    redis.expireat('test', parseInt(timestamp / 1000) + 1).then(res => {
      setTimeout(() => {
        redis.get('test').then(res => {
          t.equal(res, null, 'check 这是一个关于Redis 命令的(expireat)测试')
        }, err => {
          t.error(err)
        })
      }, 1500)
    }, err => {
      t.error(err)
    })
  })

  tap.test('这是一个关于Redis 命令的(pexpireat)测试', (t) => {
    init(redis)
    const timestamp = (new Date()).valueOf()
    t.plan(1)
    redis.pexpireat('test', timestamp + 1000).then(res => {
      setTimeout(() => {
        redis.get('test').then(res => {
          t.equal(res, null, 'check 这是一个关于Redis 命令的(pexpireat)测试')
        }, err => {
          t.error(err)
        })
      }, 1500)
    }, err => {
      t.error(err)
    })
  })

  tap.test('这是一个关于Redis 命令的(persist)测试', (t) => {
    init(redis)
    t.plan(1)
    redis.pexpire('test', 1500).then(res => {
      redis.persist('test').then(res => {
        setTimeout(() => {
          redis.get('test').then(res => {
            t.equal(res, 'value', 'check 这是一个关于Redis 命令的(persist)测试')
          }, err => {
            t.error(err)
          })
        }, 2000)
      }, err => {
        t.error(err)
      })
    }, err => {
      t.error(err)
    })
  })

  tap.test('这是一个关于Redis 命令的(ttl)测试', (t) => {
    init(redis)
    t.plan(1)
    redis.ttl('test').then(res => {
      t.equal(res, -1, 'check 这是一个关于Redis 命令的(ttl)测试')
    }, err => {
      t.error(err)
    })
  })

  tap.test('这是一个关于Redis 命令的(keys)测试', (t) => {
    init(redis)
    t.plan(1)
    redis.keys('test').then(res => {
      t.equal(res.length, 1, 'check 这是一个关于Redis 命令的(keys)测试')
    }, err => {
      t.error(err)
    })
  })

  tap.test('这是一个关于Redis 命令的(lastsave)测试', (t) => {
    init(redis)
    t.plan(1)
    redis.lastsave().then(res => {
      t.ok(res, 'check 这是一个关于Redis 命令的(lastsave)测试')
    }, err => {
      t.error(err)
    })
  })

  tap.tearDown(() => {
    console.log("tap.tearDown")
    beanify.close()
  })
})