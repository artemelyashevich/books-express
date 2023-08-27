import {Request} from 'express'

export type RequestBody<T> = Request<{}, {}, T>
export type RequestQuery<T> = Request<{}, {}, {}, T>
export type RequestParams<T> = Request<T>
