global.antRouter = ''//全局的路由
constantRouterMap = [{
    "path": "",
    "component": "Layout",
    "redirect": '/home/index',
    "children": [
        {
            "path": "home/index",
            "name": "Home",
            "component": "home/index",
            "meta": {
                "title": "首页",
                "icon": "el-icon-menu"
            }
        }
    ]
}]