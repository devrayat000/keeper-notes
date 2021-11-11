import { AutoloadPluginOptions } from 'fastify-autoload'

export interface AppOptions extends Partial<AutoloadPluginOptions> {}

export type PromiseType<T> = T extends PromiseLike<infer U> ? U : T
