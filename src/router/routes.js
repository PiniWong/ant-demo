
import main from '@/layout/main'

const login = () => import('@/view/login/login');
// const main = () => import('@/view/home/home')
const productList = () => import('@/view/productList/productList')
const roleList = () => import('@/view/role/role')
const payList = () => import('@/view/pay/payList')
const beuse = () => import('@/view/beuse/beuse')
const home = () => import('@/view/pay/payList')
const statement = () => import('@/view/statement/statement')
const limlist = () => import('@/view/limlist/limlist')

export default [{
    path: '/',
    redirect: '/login'
},
{
    path: "/login",
    meta: {
        title: '登录'
    },
    component: login
},
{
    path: '/',
    meta: {
        title: "首页"
    },
    component: main,
    children: [ {
        path: '',
        redirect: '/payList',
      },{
        path: '/home',
        name: 'home',
        meta: {
            title: "首页"
        },
        component: home,
      },{
        path: '/payList',
        name: 'payList',
        meta: {
            title: '支付列表'
        },
        component: payList
    },{
        path: '/beuse',
        name: 'beuse',
        meta: {
            title: '支出类型'
        },
        component: beuse
    }, {
        path: '/roleList',
        name: 'roleList',
        meta: {
            title: '角色分配'
        },
        component: roleList
    }, {
        path: '/productList',
        name: 'productList',
        meta: {
            title: '商品列表'
        },
        component: productList
    }, {
        path: '/limlist',
        name: 'limlist',
        meta: {
            title: '商品权限'
        },
        component: limlist
    }, {
        path: '/statement',
        name: 'statement',
        meta: {
            title: '数据报表'
        },
        component: statement
    },
    ]
}
]