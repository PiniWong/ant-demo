
import main from '@/layout/main'

const login = () => import('@/view/login/login');
// const main = () => import('@/view/home/home')
const productList = () => import('@/view/productList/productList')
const userList = () => import('@/view/user/user')
const payList = () => import('@/view/pay/payList')
const payChart = () => import('@/view/pay/payChart')
//配置
const beuse = () => import('@/view/beuse/beuse')
const singin = () => import('@/view/singin/singin')
const convert = () => import('@/view/convert/convert')
// const home = () => import('@/view/pay/payList')
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
    name:'main',
    component: main,
    children: [
    
      {
        path: '',
        redirect: '/userList',
      },
      {
        path: '',
        redirect: '/userList',
      },
    {
        path: '/singin',
        name: 'singin',
        meta: {
            title: '签到配置'
        },
        component: singin
    },
    {
        path: '/convert',
        name: 'convert',
        meta: {
            title: '兑换商品配置'
        },
        component: convert
    },
    {
        path: '/payList',
        name: 'payList',
        meta: {
            title: '支付列表'
        },
        component: payList
    },
    {
        path: '/payChart',
        name: 'payChart',
        meta: {
            title: '用户周图表'
        },
        component: payChart
    },
    {
        path: '/beuse',
        name: 'beuse',
        meta: {
            title: '支出类型'
        },
        component: beuse
    }, {
        path: '/userList',
        name: 'userList',
        meta: {
            title: '用户列表'
        },
        component: userList
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