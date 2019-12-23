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

beanify.ready(() => {
  console.log('beanify ready....')

  const { redis } = beanify
  redis.del('list')

  tap.test('这是一个关于Redis list类型的(lpush)测试', (t) => {
    t.plan(1)
    redis.lpush('list', [2000, 'hello redis']).then(res => {
      t.equal(res, 2, 'check 这是一个关于Redis list类型的(lpush)测试')
    }, err => {
      t.error(err)
    })
  })

  tap.test('这是一个关于Redis list类型的(lpushx)测试', (t) => {
    t.plan(1)
    redis.lpushx('list', 2000).then(res => {
      t.equal(res, 3, 'check 这是一个关于Redis list类型的(lpushx)测试')
    }, err => {
      t.error(err)
    })
  })

  tap.test('这是一个关于Redis list类型的(rpush)测试', (t) => {
    t.plan(1)
    redis.rpush('list', [3000, 'hello redis']).then(res => {
      t.equal(res, 5, 'check 这是一个关于Redis list类型的(rpush)测试')
    }, err => {
      t.error(err)
    })
  })

  tap.test('这是一个关于Redis list类型的(rpushx)测试', (t) => {
    t.plan(1)
    redis.rpushx('list', 4000).then(res => {
      t.equal(res, 6, 'check 这是一个关于Redis list类型的(rpushx)测试')
    }, err => {
      t.error(err)
    })
  })

  tap.test('这是一个关于Redis list类型的(lset)测试', (t) => {
    t.plan(1)
    redis.lset('list', 1, 5000).then(res => {
      t.equal(res, 'OK', 'check 这是一个关于Redis list类型的(lset)测试')
    }, err => {
      t.error(err)
    })
  })

  tap.test('这是一个关于Redis list类型的(lrange)测试', (t) => {
    t.plan(1)
    redis.lrange('list', 2, 4).then(res => {
      t.equal(res.length, 3, 'check 这是一个关于Redis list类型的(lrange)测试')
    }, err => {
      t.error(err)
    })
  })

  tap.test('这是一个关于Redis list类型的(lindex)测试', (t) => {
    t.plan(1)
    redis.lindex('list', 2).then(res => {
      t.equal(res, '2000', 'check 这是一个关于Redis list类型的(lindex)测试')
    }, err => {
      t.error(err)
    })
  })

  tap.test('这是一个关于Redis list类型的(lpop)测试', (t) => {
    t.plan(1)
    redis.lpop('list').then(res => {
      t.equal(res, '2000', 'check 这是一个关于Redis list类型的(lpop)测试')
    }, err => {
      t.error(err)
    })
  })

  tap.test('这是一个关于Redis list类型的(rpop)测试', (t) => {
    t.plan(1)
    redis.rpop('list').then(res => {
      t.equal(res, '4000', 'check 这是一个关于Redis list类型的(rpop)测试')
    }, err => {
      t.error(err)
    })
  })

  tap.test('这是一个关于Redis list类型的(ltrim)测试', (t) => {
    t.plan(1)
    redis.ltrim('list', 3, 4).then(res => {
      t.equal(res, 'OK', 'check 这是一个关于Redis list类型的(ltrim)测试')
    }, err => {
      t.error(err)
    })
  })

  tap.test('这是一个关于Redis list类型的(lrem)测试', (t) => {
    t.plan(1)
    redis.lpush('list', [1000, 2000, 7000, 8000, 2000, 3000]).then(res => {
      redis.lrem('list', 2, '2000').then(res => {
        t.equal(res, 2, 'check 这是一个关于Redis list类型的(lrem)测试')
      }, err => {
        t.error(err)
      })
    }, err => {
      t.error(err)
    })
    
  })

  tap.test('这是一个关于Redis list类型的(llen)测试', (t) => {
    t.plan(1)
    redis.llen('list').then(res => {
      t.equal(res, 5, 'check 这是一个关于Redis list类型的(llen)测试')
    }, err => {
      t.error(err)
    })
  })

  tap.test('这是一个关于Redis list类型的(linsert)测试', (t) => {
    t.plan(1)
    redis.linsert('list', 'BEFORE', '7000', 10000).then(res => {
      t.equal(res, 6, 'check 这是一个关于Redis list类型的(linsert)测试')
    }, err => {
      t.error(err)
    })
  })

  tap.tearDown(() => {
    console.log("tap.tearDown")
    beanify.close()
  })
})
