<template>
    <div class="container">
        <el-container>
            <el-aside width="200px">
                <el-menu mode="vertical" unique-opened :default-active="$route.path" background-color="#304156"
                    text-color="#fff" active-text-color="#409EFF">
                    <template v-for="item in routes" v-if="!item.hidden&&item.children">
                        <router-link v-if="item.children.length===1 && !item.children[0].children && !item.alwaysShow"
                            :to="item.path+'/'+item.children[0].path" :key="item.children[0].name">
                            <el-menu-item :index="item.path+'/'+item.children[0].path" :class="{'submenu-title-noDropdown':!isNest}">
                                <i :class="item.children[0].meta.icon"></i>
                                <span v-if="item.children[0].meta&&item.children[0].meta.title">{{item.children[0].meta.title}}</span>
                            </el-menu-item>
                        </router-link>

                        <el-submenu v-else :index="item.name||item.path" :key="item.name">
                            <template slot="title">
                                <i :class="item.meta.icon"></i>
                                <span v-if="item.meta&&item.meta.title">{{item.meta.title}}</span>
                            </template>

                            <template v-for="child in item.children" v-if="!child.hidden">
                                <sidebar-item :is-nest="true" class="nest-menu" v-if="child.children&&child.children.length>0"
                                    :routes="[child]" :key="child.path"></sidebar-item>

                                <router-link v-else :to="item.path+'/'+child.path" :key="child.name">
                                    <el-menu-item :index="item.path+'/'+child.path">
                                        <span v-if="child.meta&&child.meta.title">{{child.meta.title}}</span>
                                    </el-menu-item>
                                </router-link>
                            </template>
                        </el-submenu>

                    </template>
                </el-menu>
            </el-aside>
            <el-main>
                <transition name="fade" mode="out-in">
                    <router-view></router-view>
                </transition>
            </el-main>
        </el-container>
    </div>
</template>

<script>
export default {
  data() {
    return {
      isNest: false
    };
  },
  computed: {
    routes() {
      return global.antRouter;
    }
  }
};
</script>

<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.28s;
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
}
.container {
  position: relative;
  height: 100%;
  width: 100%;

  .el-container {
    height: 100%;

    .el-header {
      background-color: #4f91f1;
      color: #fff;
      //   text-align: center;
      padding-left: 0;
      line-height: 50px;
      height: 50px !important;
      .systemName {
        font-size: 24px;
        font-weight: bold;
        display: inline-block;
        min-width: 200px;
        text-align: center;
        color: #fff;
        height: 50px;
      }
      ul {
        float: right;
        height: 100%;
        overflow: hidden;
        li {
          margin: 0 8px;
          cursor: pointer;
          float: left;
        }
      }
    }

    .el-menu-item,
    .el-submenu .el-menu-item {
      height: 40px;
      line-height: 40px;
    }
  }
}

.el-aside {
  width: 200px !important;
  transition: width 0.28s;
  overflow-x: hidden;
  &.collapse {
    width: 64px !important;
  }
  .el-menu {
    height: 100%;
    border-right: 0;
    width: 200px;
    &.el-menu--collapse {
      width: initial;
    }
  }
}

.el-main {
  background-color: #ecf0f5;
  color: #000;
  height: 100%;
  //   .content-wrap {
  //     background: #fff;
  //   }
}
.iconfont {
  font-size: 18px;
}
</style>