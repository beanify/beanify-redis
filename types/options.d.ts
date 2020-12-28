import IORedis from 'ioredis'
import { Beanify, PluginOptions, PluginDoneCallback } from 'beanify'

export class BeanifyRedisOptions extends PluginOptions {
  namespace: string
  urls: string | [string]
  client: IORedis.Redis
  redis: IORedis.RedisOptions
}

export type BeanifyRedis = (
  beanify: Beanify,
  options: BeanifyRedisOptions,
  next: PluginDoneCallback
) => Promise<void>