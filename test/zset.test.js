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

function init (redis) {
  redis.del('zset')
  redis.del('zset1')
  redis.zadd('zset', 2, 'test')
  redis.zadd('zset', 1, '123')
  redis.zadd('zset', 1, 'hello')
  redis.zadd('zset', 4, [1, 2, 3])
  redis.zadd('zset', 5, 'hello word')
  redis.zadd('zset1', 1, 'hello')
  redis.zadd('zset1', 4, [1, 2, 3])
  redis.zadd('zset1', 5, 'hello word')
  redis.zadd('zset1', 4, 'z word')
  redis.zadd('zset1', 3, 'h word')
  redis.zadd('zset1', 0, 'a')
  redis.zadd('zset1', 1, 'b')
  redis.zadd('zset1', 2, 'c')
}

beanify.ready(() => {
  console.log('beanify ready....')

  const { redis } = beanify
  init(redis)

  tap.test('这是一个关于Redis zset类型的(zadd)测试', (t) => {
    t.plan(1)
    redis.zadd('zset', 3, 'hello redis').then(res => {
      t.equal(res, 1, 'check 这是一个关于Redis set类型的(zadd)测试')
    }, err => {
      t.error(err)
    })
  })

  tap.test('这是一个关于Redis zset类型的(zrange)测试', (t) => {
    t.plan(2)
    redis.zrange('zset', 0, 3, function (err, res) {
      t.equal(res.length, 4, 'check 这是一个关于Redis set类型的(zrange)测试')
      t.error(err)
    })
  })

  tap.test('这是一个关于Redis zset类型的(zrange + withscores)测试', (t) => {
    t.plan(1)
    redis.zrange('zset', 0, 3, 'WITHSCORES').then(res => {
      t.equal(res.length, 8, 'check 这是一个关于Redis set类型的(zrange + withscores)测试')
    }, err => {
      t.error(err)
    })
  })

  tap.test('这是一个关于Redis zset类型的(zcard)测试', (t) => {
    t.plan(1)
    redis.zcard('zset').then(res => {
      t.equal(res, 7, 'check 这是一个关于Redis set类型的(zcard)测试')
    }, err => {
      t.error(err)
    })
  })

  tap.test('这是一个关于Redis zset类型的(zcount)测试', (t) => {
    t.plan(1)
    redis.zcount('zset', 0, 2).then(res => {
      t.equal(res, 4, 'check 这是一个关于Redis set类型的(zcount)测试')
    }, err => {
      t.error(err)
    })
  })

  tap.test('这是一个关于Redis zset类型的(zincrby)测试', (t) => {
    t.plan(2)
    redis.zincrby('zset', 2, 'hello word', function (err, res) {
      t.equal(res, '7', 'check 这是一个关于Redis set类型的(zincrby)测试')
      t.error(err)
    })
  })

  tap.test('这是一个关于Redis zset类型的(zinterstore)测试', (t) => {
    t.plan(1)
    redis.zinterstore('new_zset', 2, 'zset', ['zset1']).then(res => {
      t.equal(res, 4, 'check 这是一个关于Redis set类型的(zinterstore)测试')
    }, err => {
      t.error(err)
    })
  })

  tap.test('这是一个关于Redis zset类型的(zcount)测试', (t) => {
    t.plan(1)
    redis.zcount('zset1', 1, 3).then(res => {
      t.equal(res, 5, 'check 这是一个关于Redis set类型的(zcount)测试')
    }, err => {
      t.error(err)
    })
  })

  tap.test('这是一个关于Redis zset类型的(zrangebyscore)测试', (t) => {
    t.plan(1)
    redis.zrangebyscore('zset1', 1, 5).then(res => {
      t.equal(res.length, 8, 'check 这是一个关于Redis set类型的(zrangebyscore)测试')
    }, err => {
      t.error(err)
    })
  })

  tap.test('这是一个关于Redis zset类型的(zrangebyscore+limit)测试', (t) => {
    t.plan(1)
    redis.zrangebyscore('zset1', 1, 5, 'LIMIT', 0, 3).then(res => {
      t.equal(res.length, 3, 'check 这是一个关于Redis set类型的(zrangebyscore+limit)测试')
    }, err => {
      t.error(err)
    })
  })

  tap.test('这是一个关于Redis zset类型的(zrevrangebyscore)测试', (t) => {
    t.plan(1)
    redis.zrevrangebyscore('zset1', 0, 5).then(res => {
      t.equal(res.length, 0, 'check 这是一个关于Redis set类型的(zrevrangebyscore)测试')
    }, err => {
      t.error(err)
    })
  })

  tap.test('这是一个关于Redis zset类型的(zrevrangebyscore+limit)测试', (t) => {
    t.plan(1)
    redis.zrevrangebyscore('zset1', 0, 5, 'LIMIT', 0, 1).then(res => {
      t.equal(res.length, 0, 'check 这是一个关于Redis set类型的(zrevrangebyscore+limit)测试')
    }, err => {
      t.error(err)
    })
  })

  tap.test('这是一个关于Redis zset类型的(zrank)测试', (t) => {
    t.plan(1)
    redis.zrank('zset', 'hello').then(res => {
      t.equal(res, 1, 'check 这是一个关于Redis set类型的(zrank)测试')
    }, err => {
      t.error(err)
    })
  })

  tap.test('这是一个关于Redis zset类型的(zscore)测试', (t) => {
    t.plan(1)
    redis.zscore('zset', 'hello').then(res => {
      t.equal(res, '1', 'check 这是一个关于Redis set类型的(zscore)测试')
    }, err => {
      t.error(err)
    })
  })

  tap.test('这是一个关于Redis zset类型的(zrevrank)测试', (t) => {
    t.plan(1)
    redis.zrevrank('zset', 'hello').then(res => {
      t.equal(res, 5, 'check 这是一个关于Redis set类型的(zrevrank)测试')
    }, err => {
      t.error(err)
    })
  })

  tap.test('这是一个关于Redis zset类型的(zremrangebyscore)测试', (t) => {
    t.plan(1)
    redis.zremrangebyscore('zset1', 0, 3).then(res => {
      t.equal(res, 6, 'check 这是一个关于Redis set类型的(zremrangebyscore)测试')
    }, err => {
      t.error(err)
    })
  })

  tap.test('这是一个关于Redis zset类型的(zremrangebyrank)测试', (t) => {
    t.plan(1)
    redis.zremrangebyrank('zset1', 0, 2).then(res => {
      t.equal(res, 3, 'check 这是一个关于Redis set类型的(zremrangebyrank)测试')
    }, err => {
      t.error(err)
    })
  })

  tap.test('这是一个关于Redis zset类型的(zrevrange)测试', (t) => {
    t.plan(2)
    redis.zrevrange('zset', 0, 3, function (err, res) {
      t.equal(res.length, 4, 'check 这是一个关于Redis set类型的(zrevrange)测试')
      t.error(err)
    })
  })

  tap.test('这是一个关于Redis zset类型的(zrevrange+withscores)测试', (t) => {
    t.plan(1)
    redis.zrevrange('zset', 0, 3, 'WITHSCORES').then(res => {
      t.equal(res.length, 8, 'check 这是一个关于Redis set类型的(zrevrange+withscores)测试')
    }, err => {
      t.error(err)
    })
  })

  tap.tearDown(() => {
    console.log('tap.tearDown')
    beanify.close()
  })
})
