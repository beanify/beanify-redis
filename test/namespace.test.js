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
  namespace: 'redis1',
  host: '127.0.0.1',
  port: 6379,
  db: 0
})

beanify.register(require('../index'), {
  serializedObject: true,
  namespace: 'redis2',
  host: '127.0.0.1',
  port: 6379,
  db: 0
})

beanify.ready(() => {
  console.log('beanify ready....')

  const {redis1, redis2} = beanify.redis
  redis1.del('string')

  tap.test('这是一个关于Redis string类型的(set)测试', (t) => {
    t.plan(1)
    redis1.set('string', 1000).then(res => {
      t.equal(res, 'OK', 'check 这是一个关于Redis string类型的(set)测试')
    }, err => {
      t.error(err)
    })
  })

  tap.test('这是一个关于Redis string类型的(get)测试', (t) => {
    t.plan(1)
    redis1.get('string').then(res => {
      t.equal(res, '1000', 'check 这是一个关于Redis string类型的(get)测试')
    }, err => {
      t.error(err)
    })
  })

  tap.test('这是一个关于Redis string类型的(incr,decr,incrby,decrby)测试', (t) => {
    t.plan(5)
    redis1.incr('string').then(res => {
      t.equal(res, 1001, 'check 这是一个关于Redis string类型的(incr)测试')
    }, err => {
      t.error(err)
    })
    redis2.decr('string').then(res => {
      t.equal(res, 1000, 'check 这是一个关于Redis string类型的(decr)测试')
    }, err => {
      t.error(err)
    })
    redis1.incrby('string', 888).then(res => {
      t.equal(res, 1888, 'check 这是一个关于Redis string类型的(incrby)测试')
    }, err => {
      t.error(err)
    })
    redis2.decrby('string', 1000).then(res => {
      t.equal(res, 888, 'check 这是一个关于Redis string类型的(decrby)测试')
    }, err => {
      t.error(err)
    })
    redis2.incrbyfloat('string', 112.5).then(res => {
      t.equal(res, '1000.5', 'check 这是一个关于Redis string类型的(incrbyfloat)测试')
    }, err => {
      t.error(err)
    })
  })

  tap.test('这是一个关于Redis string类型的(append)测试', (t) => {
    t.plan(1)
    redis2.append('string', 1000).then(res => {
      t.equal(res, 10, 'check 这是一个关于Redis string类型的(append)测试')
    }, err => {
      t.error(err)
    })
  })

  tap.test('这是一个关于Redis string类型的(getrange)测试', (t) => {
    t.plan(1)
    redis1.getrange('string', 5, 9).then(res => {
      t.equal(res, '51000', 'check 这是一个关于Redis string类型的(getrange)测试')
    }, err => {
      t.error(err)
    })
  })

  tap.test('这是一个关于Redis string类型的(setrange)测试', (t) => {
    t.plan(1)
    redis2.setrange('string', 5, '9999').then(res => {
      t.equal(res, 10, 'check 这是一个关于Redis string类型的(setrange)测试')
    }, err => {
      t.error(err)
    })
  })

  tap.test('这是一个关于Redis string类型的(del)测试', (t) => {
    t.plan(1)
    redis2.del('string').then(res => {
      t.equal(res, 1, 'check 这是一个关于Redis string类型的(del)测试')
    }, err => {
      t.error(err)
    })
  })

  tap.test('这是一个关于Redis string类型的(setex)测试', (t) => {
    t.plan(2)
    redis1.set('hello1', 1000, 'EX', 2).then(res => {
      t.equal(res, 'OK', 'check 这是一个关于Redis string类型的(setex)测试')
    }, err => {
      t.error(err)
    })
    setTimeout(() => {
      redis2.get('hello1').then(res => {
        t.equal(res, null, 'check 这是一个关于Redis string类型的(setex)测试')
      }, err => {
        t.error(err)
      })
    }, 3000)
  })

  tap.tearDown(() => {
    console.log("tap.tearDown")
    beanify.close()
  })
})
