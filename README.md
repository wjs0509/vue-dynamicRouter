# dynamicrouter

> 关于vue动态加载路由的例子

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

```
import router from './index'
import axios from 'axios'
const _import = require('./_import_' + process.env.NODE_ENV)//获取组件的方法
import Layout from '@/views/layout' //Layout 是架构组件，不在后台返回，在文件里单独引入

var getRouter //用来获取后台拿到的路由
router.beforeEach((to, from, next) => {
    if (!getRouter) {//不加这个判断，路由会陷入死循环
        if (!getObjArr('router')) {
            axios.get('https://www.easy-mock.com/mock/5cc02232d80bc359aaee6aa6/dynamicRouter/getrouter').then(res => {
                getRouter = res.data.data.router//后台拿到路由
                getRouter = [...constantRouterMap,...getRouter]
                saveObjArr('router', getRouter) //存储路由到localStorage
                routerGo(to, next)//执行路由跳转方法
            })
        } else {//从localStorage拿到了路由
            getRouter = getObjArr('router')//拿到路由
            routerGo(to, next)
        }
    } else {
        next()
    }

})


function routerGo(to, next) {
    getRouter = filterAsyncRouter(getRouter) //过滤路由
    router.addRoutes(getRouter) //动态添加路由
    global.antRouter = getRouter //将路由数据传递给全局变量，做侧边栏菜单渲染工作
    next({ ...to, replace: true })
}

function saveObjArr(name, data) { //sessionStorage 存储数组对象的方法
    sessionStorage.setItem(name, JSON.stringify(data))
}

function getObjArr(name) { //sessionStorage 获取数组对象的方法
    return JSON.parse(window.sessionStorage.getItem(name));
}

function filterAsyncRouter(asyncRouterMap) { //遍历后台传来的路由字符串，转换为组件对象
    const accessedRouters = asyncRouterMap.filter(route => {
        if (route.component) {
            if (route.component === 'Layout') {//Layout组件特殊处理
                route.component = Layout
            } else {
                route.component = _import(route.component)
            }
        }
        if (route.children && route.children.length) {
            route.children = filterAsyncRouter(route.children)
        }
        return true
    })

    return accessedRouters
}
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
