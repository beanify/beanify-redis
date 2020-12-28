import IORedis from 'ioredis'
import { Beanify } from 'beanify'

import { BeanifyRedis, BeanifyRedisOptions } from './types/options'
declare const redis: BeanifyRedis
export = redis

declare module 'beanify' {
  interface BeanifyPlugin {
    (plugin: BeanifyRedis, options: BeanifyRedisOptions): Beanify
  }

  interface Beanify {
    redis: {
      [key: string]: IORedis.Redis
    } & IORedis.Redis
  }
}