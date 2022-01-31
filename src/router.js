import app from './App'
import index from './component/index'
import login from './component/login'
import layout from "./layout/layout";
import mainPage from "./component/mainPage";
import VueRouter from "vue-router";
import logout from "./component/logout";
import register from "./component/register";


const originPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location){
  return originPush.call(this,location).catch(err=>err)
}


const routers = [
  {
    path:'/',
    name:'layout',
    component:layout,
    redirect:'mainPage',
    children: [         //子组件
      {
        path:'mainPage',
        name:'mainPage',
        component: mainPage,
      },
      {
        path:'index',
        name:'index',
        component:index,
      },
    ]
  },

  {
    path:'/login',
    name:'login',
    component: login,
  },
  {
    path:'/logout',
    name:'logout',
    component: logout
  },
  {
    path:'/register',
    name:'register',
    component: register
  },
]
export default routers;

