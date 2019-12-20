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
  redis.del('set')
  redis.del('set1')
  redis.del('set2')
  redis.del('set3')
  redis.sadd('set', 1)
  redis.sadd('set', 5)
  redis.sadd('set1', 1)
  redis.sadd('set1', 2)
  redis.sadd('set2', 1)
  redis.sadd('set2', 3)
  redis.sadd('set3', 4)
  redis.sadd('set3', { name: 'name', value: 'value' })
}

beanify.ready(() => {
  console.log('beanify ready....')

  const { redis } = beanify
  init(redis)

  tap.test('这是一个关于Redis set类型的(sadd)测试', (t) => {
    t.plan(1)
    redis.sadd('set', [{ name: 'name', value: 'value' }, 9]).then(res => {
      t.equal(res, 2, 'check 这是一个关于Redis set类型的(sadd)测试')
    }, err => {
      t.error(err)
    })
  })
  tap.test('这是一个关于Redis set类型的(smembers)测试', (t) => {
    t.plan(1)
    redis.smembers('set').then(res => {
      t.equal(res[0], '{"name":"name","value":"value"}', 'check 这是一个关于Redis set类型的(smembers)测试')
    }, err => {
      t.error(err)
    })
  })

  tap.test('这是一个关于Redis set类型的(sismember)测试', (t) => {
    t.plan(1)
    redis.sismember('set', { name: 'name', value: 'value' }).then(res => {
      console.log('---------------', res)
      t.equal(res, 1, 'check 这是一个关于Redis set类型的(sismember)测试')
    }, err => {
      t.error(err)
    })
  })

  tap.test('这是一个关于Redis set类型的(scard)测试', (t) => {
    t.plan(1)
    redis.scard('set').then(res => {
      console.log('---------------', res)
      t.equal(res, 4, 'check 这是一个关于Redis set类型的(scard)测试')
    }, err => {
      t.error(err)
    })
  })

  // tap.test('这是一个关于Redis set类型的(smove)测试', (t) => {
  //   t.plan(1);
  //   hemera.act({
  //     topic: 'redis-store',
  //     cmd: 'smove',
  //     source_key: 'set',
  //     dest_key: 'new_set',
  //     item: { name: 'name', value: 'value' }
  //   }).then(resp => {
  //     t.equal(1, resp.data)
  //   }, err => {
  //     t.error(err)
  //   })
  // })

  // tap.test('这是一个关于Redis set类型的(sdiff)测试', (t) => {
  //   t.plan(1);
  //   hemera.act({
  //     topic: 'redis-store',
  //     cmd: 'sdiff',
  //     key: 'set',
  //     keys: ['set1', 'set2', 'set3'],
  //   }).then(resp => {
  //     t.equal('5', resp.data[0])
  //   }, err => {
  //     t.error(err)
  //   })
  // })

  // tap.test('这是一个关于Redis set类型的(sdiffstore)测试', (t) => {
  //   t.plan(1);
  //   hemera.act({
  //     topic: 'redis-store',
  //     cmd: 'sdiffstore',
  //     dest_key: 'new_key',
  //     key: 'set',
  //     keys: ['set1', 'set2', 'set3'],
  //   }).then(resp => {
  //     t.equal(2, resp.data)
  //   }, err => {
  //     t.error(err)
  //   })
  // })

  // tap.test('这是一个关于Redis set类型的(sinter)测试', (t) => {
  //   t.plan(1);
  //   hemera.act({
  //     topic: 'redis-store',
  //     cmd: 'sinter',
  //     key: 'set',
  //     keys: ['set1', 'set2'],
  //   }).then(resp => {
  //     t.equal('1', resp.data[0])
  //   }, err => {
  //     t.error(err)
  //   })
  // })

  // tap.test('这是一个关于Redis set类型的(sinterstore)测试', (t) => {
  //   t.plan(1);
  //   hemera.act({
  //     topic: 'redis-store',
  //     cmd: 'sinterstore',
  //     dest_key: 'new_key',
  //     key: 'set',
  //     keys: ['set1'],
  //   }).then(resp => {
  //     t.equal(1, resp.data)
  //   }, err => {
  //     t.error(err)
  //   })
  // })

  // tap.test('这是一个关于Redis set类型的(sunion)测试', (t) => {
  //   t.plan(1);
  //   hemera.act({
  //     topic: 'redis-store',
  //     cmd: 'sunion',
  //     key: 'set',
  //     keys: ['set1', 'set2'],
  //   }).then(resp => {
  //     t.equal('5', resp.data[3])
  //   }, err => {
  //     t.error(err)
  //   })
  // })

  // tap.test('这是一个关于Redis set类型的(sunionstore)测试', (t) => {
  //   t.plan(1);
  //   hemera.act({
  //     topic: 'redis-store',
  //     cmd: 'sunionstore',
  //     dest_key: 'new_key',
  //     key: 'set',
  //     keys: ['set1', 'set2', 'set3'],
  //   }).then(resp => {
  //     t.equal(2, resp.data)
  //   }, err => {
  //     t.error(err)
  //   })
  // })

  // tap.test('这是一个关于Redis set类型的(srem)测试', (t) => {
  //   t.plan(1);
  //   hemera.act({
  //     topic: 'redis-store',
  //     cmd: 'srem',
  //     key: 'new_set',
  //     value: { name: 'name', value: 'value' }
  //   }).then(resp => {
  //     t.equal(1, resp.data)
  //   }, err => {
  //     t.error(err)
  //   })
  // })

  // tap.test('这是一个关于Redis set类型的(spop)测试', (t) => {
  //   t.plan(1);
  //   hemera.act({
  //     topic: 'redis-store',
  //     cmd: 'spop',
  //     key: 'set'
  //   }).then(resp => {
  //     t.equal('string', typeof resp.data)
  //   }, err => {
  //     t.error(err)
  //   })
  // })

  tap.tearDown(() => {
    console.log('tap.tearDown')
    beanify.close()
  })  
})