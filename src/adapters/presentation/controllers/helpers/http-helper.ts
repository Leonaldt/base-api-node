import { HttpResponse } from '../ports/http'
import { ServerError } from '../errors/server-error'

export const ok = (data: any): HttpResponse => ({
  statusCode: 200,
  body: data
})

export const created = (data: any): HttpResponse => ({
  statusCode: 201,
  body: data
})

export const unauthorized = (error: Error): HttpResponse => ({
  statusCode: 401,
  body: error
})

export const forbidden = (error: Error): HttpResponse => ({
  statusCode: 403,
  body: error
})

export const badRequest = (error: Error): HttpResponse => ({
  statusCode: 400,
  body: error.message
})

export const notFound = (error: Error): HttpResponse => ({
  statusCode: 404,
  body: error.message
})

export const serverError = (reason: string): HttpResponse => ({
  statusCode: 500,
  body: new ServerError(reason)
})
