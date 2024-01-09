import path from 'path'
import fs from 'fs'
import Router from 'koa-router'
import Koa from 'koa'
import body from 'koa-body'
import json from 'koa-json'
import globalException from './GlobalExce'
class AllRouterLoader {
  app!: Koa
  static allRouterLoader: AllRouterLoader = new AllRouterLoader()
  // 初始化方法
  init(app: Koa) {
    this.app = app
    const rootRouter = this.loadAllRouterWrapper()
    this.app.use(globalException)
    this.app.use(rootRouter.routes())
    this.listen()

  }
  // 1. 加载所有路由文件数组
  getFiles(dir: string) {
    if (fs.existsSync(dir)) {
      return fs.readdirSync(dir)
    }
    return []
  }
  // 2. 加载所有路由文件绝对路径数组
  getAbsoluteFilePaths() {
    const dir = path.join(process.cwd(), '/src/router')
    if (fs.existsSync(dir)) {
      const allFilePaths = this.getChildAbsPath(dir, [])
      return allFilePaths
    }
    return []
  }
  // 获取子级目录中的文件
  getChildAbsPath(dir: string, filePaths: string[] = []) {
    const allFiles = this.getFiles(dir)
    allFiles.forEach(e => {
      let currentPath = path.join(dir, e)
      let stat = fs.lstatSync(currentPath);
      if(stat.isDirectory()) {
        filePaths = this.getChildAbsPath(currentPath, filePaths)
      }else if(stat.isFile()) {
        filePaths.push(currentPath)
      }
    });
    return filePaths
  }
  isRouter(data: any):data is Router {
    return data instanceof Router
  }
  // 3. 加载所有一级路由到二级路由中
  loadAllRouterWrapper() {
    // 3.0 得到一级路由
    const rootRouter = this.getRootRouter()
    // 3.1 调用获取绝对路径数组方法
    const allFullFilePaths = this.getAbsoluteFilePaths()
    // 3.2 调用加载所有二级路由到一级路由方法
    this.loadAllRouter(allFullFilePaths, rootRouter)
    return rootRouter
  }
  // 调用加载所有一级路由到二级路由方法
  loadAllRouter(allFilePaths: string[], rootRouter: Router) {
    for(let fullFilePath of allFilePaths) {
      const module = require(fullFilePath)
      if(this.isRouter(module)) {
        rootRouter.use(module.routes(), module.allowedMethods())
      }
    }
  }
  // 得到一级路由
  getRootRouter() {
    const rootRouter = new Router()
    rootRouter.prefix('/dang')
    this.app.use(json())
    this.app.use(body())
    return rootRouter
  }
 
  // 监听方法
  listen() {
    this.app.listen(3002)
    console.log("在3002端口监听。。。")
  }

}
export default AllRouterLoader.allRouterLoader