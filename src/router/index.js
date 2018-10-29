import Vue from 'vue';
import Router from 'vue-router';

//home
import Home from '../components/common/Home'
//部门管理
//部门列表
// import DepartmentList from '../components/view/deptcomponents/departmentlist'

//目录编目
//目录类目
import CatelogCategory from '../components/view/catelogcomponents/catelogcategory'
//目录编目
import CatelogList from '../components/view/catelogcomponents/cateloglist'
//数据项列表
import DateitemList from '../components/view/catelogcomponents/dataitemlist'

//目录注册
//待审核
import PendingReview from '../components/view/catelogregiestcomponents/pendingreview'
//已审核
import Audited from '../components/view/catelogregiestcomponents/audited'

//目录发布
//待发布
import WaitRelease from '../components/view/catelogreleasecomponents/waitrelease'
//已发布
import AlreadyRelease from '../components/view/catelogreleasecomponents/alreadyrelease'
//已退回
import Returned from '../components/view/catelogreleasecomponents/returned'

//目录查询
//目录检索
import CatelogSearch from '../components/view/catelogquerycomponents/catelogsearch'
import CatelogStatistics from '../components/view/catelogquerycomponents/catelogstatistics'
import CatelogNavigation from '../components/view/catelogquerycomponents/catelognavigation'
//个性化动态目录制定
import CatelogSystem from '../components/view/catelogquerycomponents/catelogsystem'
import CatelogCustomize from '../components/view/catelogquerycomponents/catelogcustomize'

//目录维护
//目录列表
import MaintainCatelogList from '../components/view/catelogmaintaincomponents/maintaincateloglist'
import MainBackup from '../components/view/catelogmaintaincomponents/mainbackup'
import MainCanellation from '../components/view/catelogmaintaincomponents/maincancellation'

Vue.use(Router);

export default new Router({
    routes: [{
            path: '/',
            redirect: '/login'
        },
        {
            path: '/home',
            component: Home,
            name: '主页',
            redirect: '/cateloglistall/catelogcategory',
            children: [
                {
                    path: '/cateloglistall',
                    name: '目录编目',
                    redirect: '/cateloglistall/catelogcategory',
                    component: {
                        render(c) {
                            return c('router-view')
                        }
                    },
                    children: [{
                            path: '/cateloglistall/catelogcategory',
                            name: '目录类目',
                            component: CatelogCategory
                        },
                        {
                            path: '/cateloglistall/cateloglist',
                            name: '目录编目',
                            component: CatelogList
                        },
                        {
                            path: '/cateloglistall/dataitemlist',
                            name: '数据项列表',
                            component: DateitemList
                        }
                    ]
                },
                {
                    path: '/catologregiest',
                    name: '目录注册',
                    redirect: '/catologregiest/pendingreview',
                    component: {
                        render(c) {
                            return c('router-view')
                        }
                    },
                    children: [{
                            path: '/catologregiest/pendingreview',
                            name: '待审核',
                            component: PendingReview
                        },
                        {
                            path: '/catologregiest/audited',
                            name: '已审核',
                            component: Audited
                        }
                    ]
                },
                {
                    path: '/catelogrelease',
                    name: '目录发布',
                    redirect: '/catelogrelease/waitrelease',
                    component: {
                        render(c) {
                            return c('router-view')
                        }
                    },
                    children: [{
                            path: '/catelogrelease/waitrelease',
                            name: '待发布',
                            component: WaitRelease
                        },
                        {
                            path: '/catelogrelease/alreadyrelease',
                            name: '已发布',
                            component: AlreadyRelease
                        },
                        {
                            path: '/catelogrelease/returned',
                            name: '已退回',
                            component: Returned
                        }
                    ]
                },
                {
                    path: '/catelogquery',
                    name: "目录查询",
                    redirect: '/catelogquery/catelogsearch',
                    component: {
                        render(c) {
                            return c('router-view')
                        }
                    },
                    children: [
                        {
                            path: '/catelogquery/catelogsearch',
                            name: '目录检索',
                            component: CatelogSearch
                        },
                        {
                            path: '/catelogquery/catelognavigation',
                            name: '目录导航',
                            component: CatelogNavigation
                        },
                        {
                            path: '/catelogquery/catelogstatistics',
                            name: '目录统计',
                            component: CatelogStatistics
                        },
                        {
                            path: '/catelogquery/catelogsystem',
                            name: '系统导航',
                            component: CatelogSystem
                        },
                        {
                            path: '/catelogquery/catelogcustomize',
                            name: '个性化动态目录制定',
                            component: CatelogCustomize
                        }
                    ]
                },
                {
                    path: '/catelogmaintain',
                    name: '目录维护',
                    redirect: '/catelogmaintain/maintaincateloglist',
                    component: {
                        render(c) {
                            return c('router-view')
                        }
                    },
                    children: [{
                            path: '/catelogmaintain/maintaincateloglist',
                            name: '目录维护',
                            component: MaintainCatelogList
                        },
                        {
                            path: '/catelogmaintain/mainbackup',
                            name: '目录备份',
                            component: MainBackup
                        },
                        {
                            path: '/catelogmaintain/maincancellation',
                            name: '目录注销',
                            component: MainCanellation
                        }
                    ]
                }
            ]
        },
        {
            path: '/login',
            component: resolve => require(['../components/page/Login.vue'], resolve)
        },
    ]
})
