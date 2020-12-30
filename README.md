# beanify-redis

Beanify缓存操作插件

## 安装

```bash
npm i beanify-redis --save
```

with yarn

```bash
yarn add beanify-redis
```

## 例子

```javascript
const Beanify = require('beanify')
const redis = require('beanify-redis')
const beanify = Beanify({})

beanify
  .register(redis, {
    client: 'redis test',
    namespace: 'db0'
  })
  .ready(e => {
    e && beanify.$log.error(e.message)
    beanify.print()
    console.log(beanify.db0.redis) // redis test
  })
```

## 参数

|    字段      | 类型 | 描述 |
|   :---:      | :---: | :---: |
| `client?`    | `string` | 手动传入redis客户端对象 |
| `namespace?` | `string` | 手动传入redis客户端时可以指定命名空间 |
| `urls?`      |  `string`[`string`] | redis服务地址 |
| `redis?`     |  [ioredis](https://github.com/luin/ioredis/blob/master/API.md) | ioredis库的配置参数 |
