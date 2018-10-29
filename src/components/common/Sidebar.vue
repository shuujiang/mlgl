<template>
    <div class="sidebar">
        <el-menu :default-active="onRoutes" class="el-menu-vertical-demo" unique-opened router>
            <template v-for="item in items">
                <template v-if="item.subs">
                    <el-submenu :index="item.index" :key="item.index">
                        <template slot="title"><i :class="item.icon"></i>{{ item.title }}</template>
                          <template v-if="subItem.subs" v-for="subItem in item.subs"> 
                              <el-submenu :index="subItem.index" :key="subItem.index">
                                  <template slot="title">{{ subItem.title }}</template>
                                  <el-menu-item v-for="(subItem1,k) in subItem.subs" :key="k"  :index="subItem1.index">
                                      {{ subItem1.title }}
                                  </el-menu-item>
                              </el-submenu>
                          </template>
                          <template v-else>
                              <el-menu-item :key="subItem.index" :index="subItem.index">
                                  {{ subItem.title }}
                              </el-menu-item>
                          </template>
                    </el-submenu>
                </template>
                <template v-else>
                    <el-menu-item :index="item.index" :key="item.index">
                        <i :class="item.icon"></i>{{ item.title }}
                    </el-menu-item>
                </template>
            </template>
        </el-menu>
    </div>
</template>

<script>
export default {
  data() {
    return {
      items: [
        {
          icon: "el-icon-document",
          index: "/cateloglistall/",
          title: "目录编目",
          subs: [
            {
              icon: "",
              index: "/cateloglistall/catelogcategory",
              title: "目录类目"
            },
            {
              icon: "",
              index: "3",
              title: "目录编目",
              subs: [
                {
                  icon: "",
                  index: "/cateloglistall/cateloglist",
                  title: "目录列表"
                },
                {
                  icon: "",
                  index: "/cateloglistall/dataitemlist",
                  title: "数据项列表"
                }
              ]
            }
          ]
        },
        {
          icon: "el-icon-date",
          index: "/catologregiest",
          title: "目录注册",
          subs: [
            {
              index: "/catologregiest/pendingreview",
              title: "待审核"
            },
            {
              index: "/catologregiest/audited",
              title: "已审核"
            }
          ]
        },
        {
          icon: "el-icon-view",
          index: "/catelogrelease",
          title: "目录发布",
          subs: [
            {
              index: "/catelogrelease/waitrelease",
              title: "待发布"
            },
            {
              index: "/catelogrelease/alreadyrelease",
              title: "已发布"
            },
            {
              index: "/catelogrelease/returned",
              title: "已退回"
            }
          ]
        },
        {
          icon: "el-icon-search",
          index: "/catelogquery",
          title: "目录查询",
          subs:[
              {
                  index: "/catelogquery/catelogsearch",
                  title: "目录检索"
              },
              {
                  index: "/catelogquery/catelognavigation",
                  title: "目录导航"
              },
              {
                  index: "/catelogquery/catelogstatistics",
                  title: "目录统计"
              },
              {
                  index: "/catelogquery/catelogsystem",
                  title: "系统导航"
              },
              {
                  index: "/catelogquery/catelogcustomize",
                  title: "个性化动态目录定制"
              }
          ]
        },
        {
          icon: "el-icon-edit-outline",
          index: "/catelogmaintain",
          title: "目录维护",
          subs:[
              {
                  index: "/catelogmaintain/maintaincateloglist",
                  title: "目录维护"
              },
              {
                  index: "/catelogmaintain/mainbackup",
                  title: "目录备份"
              },
              {
                  index: "/catelogmaintain/maincancellation",
                  title: "目录注销"
              }
          ]
        }
      ]
    };
  },
  computed: {
    onRoutes() {
      return this.$route.path;
    }
  }
};
</script>

<style scoped>
.sidebar {
  display: block;
  position: absolute;
  width: 250px;
  left: 0;
  top: 70px;
  bottom: 0;
  background: #2e363f;
}
.sidebar > ul {
  height: 100%;
}
</style>
