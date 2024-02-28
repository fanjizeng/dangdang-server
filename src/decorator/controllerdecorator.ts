import AllCtrlRouterLoader from "../common/AllCtrlRouterLoader";
type methodType = 'get' | 'post' | 'put' | 'delete'

function Controller(modulePath: string = '/') {
  function getFullPath(reqPath: string) {
    if (modulePath && modulePath.length >= 1) {
      if(modulePath === '/') {
        modulePath = ''
      }else if(!modulePath.startsWith('/')) {
        modulePath = `/${modulePath}`
      }
      return `${modulePath}${reqPath}`
    }
    return reqPath
  }
  return function (targetClass: { new(...args: any): any }) {
    // 1. 获取原型上的请求方法名
    Object.getOwnPropertyNames(targetClass.prototype).forEach((methodname) => {
      if (methodname === 'constructor') return
      // 2. 根据方法名获取具体的方法体
      const routerHandlerFn = targetClass.prototype[methodname]
      // 3. 获取请求路径和请求类型，根路由对象
      const reqPath: string = Reflect.getMetadata('path', targetClass.prototype, methodname)
      const fullPath = getFullPath(reqPath)
      const reqMethodType: methodType = Reflect.getMetadata('methodType', targetClass.prototype, methodname)
      // 4. 实现路由请求
      const rootRouter = AllCtrlRouterLoader.app.context.rootRouter
      if (fullPath && reqMethodType) {
        console.log(fullPath,reqMethodType, '成功1')
        rootRouter[reqMethodType](fullPath, routerHandlerFn)
      }
    })
  }
}
export {
  Controller
}