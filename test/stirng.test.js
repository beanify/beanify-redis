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
  redis.del('string')

  tap.test('这是一个关于Redis string类型的(set)测试', (t) => {
    t.plan(1)
    redis.set('string', 1000).then(res => {
      t.equal(res, 'OK', 'check 这是一个关于Redis string类型的(set)测试')
    }, err => {
      t.error(err)
    })
  })

  tap.test('这是一个关于Redis string类型的(get)测试', (t) => {
    t.plan(1)
    redis.get('string').then(res => {
      t.equal(res, '1000', 'check 这是一个关于Redis string类型的(get)测试')
    }, err => {
      t.error(err)
    })
  })

  tap.test('这是一个关于Redis string类型的(incr,decr,incrby,decrby)测试', (t) => {
    t.plan(5)
    redis.incr('string').then(res => {
      t.equal(res, 1001, 'check 这是一个关于Redis string类型的(incr)测试')
    }, err => {
      t.error(err)
    })
    redis.decr('string').then(res => {
      t.equal(res, 1000, 'check 这是一个关于Redis string类型的(decr)测试')
    }, err => {
      t.error(err)
    })
    redis.incrby('string', 888).then(res => {
      t.equal(res, 1888, 'check 这是一个关于Redis string类型的(incrby)测试')
    }, err => {
      t.error(err)
    })
    redis.decrby('string', 1000).then(res => {
      t.equal(res, 888, 'check 这是一个关于Redis string类型的(decrby)测试')
    }, err => {
      t.error(err)
    })
    redis.incrbyfloat('string', 112.5).then(res => {
      t.equal(res, '1000.5', 'check 这是一个关于Redis string类型的(incrbyfloat)测试')
    }, err => {
      t.error(err)
    })
  })

  tap.test('这是一个关于Redis string类型的(append)测试', (t) => {
    t.plan(1)
    redis.append('string', 1000).then(res => {
      t.equal(res, 10, 'check 这是一个关于Redis string类型的(append)测试')
    }, err => {
      t.error(err)
    })
  })

  tap.test('这是一个关于Redis string类型的(getrange)测试', (t) => {
    t.plan(1)
    redis.getrange('string', 5, 9).then(res => {
      t.equal(res, '51000', 'check 这是一个关于Redis string类型的(getrange)测试')
    }, err => {
      t.error(err)
    })
  })

  tap.test('这是一个关于Redis string类型的(setrange)测试', (t) => {
    t.plan(1)
    redis.setrange('string', 5, '9999').then(res => {
      t.equal(res, 10, 'check 这是一个关于Redis string类型的(setrange)测试')
    }, err => {
      t.error(err)
    })
  })

  tap.test('这是一个关于Redis string类型的(del)测试', (t) => {
    t.plan(1)
    redis.del('string').then(res => {
      t.equal(res, 1, 'check 这是一个关于Redis string类型的(del)测试')
    }, err => {
      t.error(err)
    })
  })

  tap.test('这是一个关于Redis string类型的(setex)测试', (t) => {
    t.plan(2)
    redis.set('hello1', 1000, 'EX', 2).then(res => {
      t.equal(res, 'OK', 'check 这是一个关于Redis string类型的(setex)测试')
    }, err => {
      t.error(err)
    })

    setTimeout(() => {
      redis.get('hello1').then(res => {
        t.equal(res, null, 'check 这是一个关于Redis string类型的(setex)测试')
      }, err => {
        t.error(err)
      })
    }, 3000)
  })

  tap.tearDown(() => {
    console.log('tap.tearDown')
    beanify.close()
  })
})
