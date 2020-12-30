import { Redis, RedisOptions } from 'ioredis'
import { Beanify, PluginOptions, PluginDoneCallback } from 'beanify'

// @ts-ignore
export class BeanifyRedisOptions extends PluginOptions {
  namespace: string
  urls: string | [string]
  client: Redis
  redis: RedisOptions
}

export type BeanifyRedis = (
  beanify: Beanify,
  options: BeanifyRedisOptions,
  next: PluginDoneCallback
) => Promise<void>
