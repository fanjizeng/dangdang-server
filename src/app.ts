require('module-alias/register')
import moduleAlias from 'module-alias'
import Koa from 'koa'
// import allRouterLoader from './common/AllRouterLoader'
import allRouterLoader from './common/AllCtrlRouterLoader'

moduleAlias.addAliases({
  '@common': __dirname + '/common',
  '@controller': __dirname + '/controller',
  '@modules': __dirname + '/modules',
  '@conf': __dirname + '/conf',
  '@mstypes': __dirname + '/mstypes'
})

const app = new Koa()
allRouterLoader.init(app)