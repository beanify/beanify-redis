import IORedis from 'ioredis'
import { Beanify as beanify } from 'beanify'

import { BeanifyRedis, BeanifyRedisOptions } from './types/options'

declare const redis: BeanifyRedis
export = redis

declare module 'beanify' {
  interface BeanifyPlugin {
    (plugin: BeanifyRedis, options: BeanifyRedisOptions): beanify
  }

  interface Beanify {
    redis: {
      [key: string]: IORedis.Redis
    } & IORedis.Redis
  }
}
