import 'reflect-metadata'

export function reqProccess(methodType: string) {
  return function (reqPath: string) {
    return function (targetClassPrototype: any, methodname: string, methodDecri: PropertyDescriptor) {
      Reflect.defineMetadata('path', reqPath, targetClassPrototype, methodname)
      Reflect.defineMetadata('methodType', methodType, targetClassPrototype, methodname)
    }
  }
}

const get = reqProccess('get')
const post = reqProccess('post')
const put = reqProccess('put')
const del = reqProccess('delete')
export {
  get,
  post,
  put,
  del
}