import path from 'path'
import fs from 'fs'
import Router from 'koa-router'
import Koa from 'koa'
import body from 'koa-body'
import json from 'koa-json'
import globalException from './GlobalExce'
class AllCtrlRouterLoader {
  app!: Koa
  static allRouterLoader: AllCtrlRouterLoader = new AllCtrlRouterLoader()
  // 初始化方法
  init(app: Koa) {
    this.app = app
    this.loadMiddleAware() // 加载中间件
    this.storeRootRouterToCtx() // 保存根路由
    this.loadAllCtrlRouterWrapper() // 加载控制器路由
    this.listen()

  }
  loadMiddleAware() {
    this.app.use(json())
    this.app.use(body())
    this.app.use(globalException)
  }
  storeRootRouterToCtx() {
    const rootRouter = new Router()
    rootRouter.prefix('/dang')
    this.app.context.rootRouter = rootRouter
    this.app.use(rootRouter.routes())
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
    const dir = path.join(process.cwd(), '/src/controller')
    if (fs.existsSync(dir)) {
      const allFilePaths = this.getChildAbsPath(dir, [])
      return allFilePaths
    }
    return []
  }
  // 判断是否是控制器文件
  isCtrlFile(file: string) {
    let fileObj = path.parse(file)
    const fileName: string = fileObj.name
    const extensionName: string = fileObj.ext
    return fileName.indexOf('Controller') !== -1 && extensionName === '.ts'
  }
  // 获取子级目录中的文件
  getChildAbsPath(dir: string, filePaths: string[] = []) {
    const allFiles = this.getFiles(dir)
    allFiles.forEach(e => {
      if(this.isCtrlFile(e)) {
        let currentPath = path.join(dir, e)
        let stat = fs.lstatSync(currentPath);
        if(stat.isDirectory()) {
          filePaths = this.getChildAbsPath(currentPath, filePaths)
        }else if(stat.isFile()) {
          filePaths.push(currentPath)
        }
      }
    });
    return filePaths
  }
  isRouter(data: any):data is Router {
    return data instanceof Router
  }
  // 3. 加载所有一级路由到二级路由中
  loadAllCtrlRouterWrapper() {
    // 3.1 调用获取绝对路径数组方法
    const allFullFilePaths = this.getAbsoluteFilePaths()
    // 3.2 调用加载所有二级路由到一级路由方法
    this.loadAllRouter(allFullFilePaths)
  }
  // 调用加载所有一级路由到二级路由方法
  loadAllRouter(allFilePaths: string[]) {
    for(let fullFilePath of allFilePaths) {
      console.log(fullFilePath, '---加载路由')
      require(fullFilePath)
    }
  }
 
  // 监听方法
  listen() {
    this.app.listen(3002)
    console.log("在3002端口监听。。。")
  }

}
export default AllCtrlRouterLoader.allRouterLoader