import VueRouter from 'vue-router'
import HomeContainer from "./components/HomeContaiber.vue"
import MemberContainer from "./components/MemberContainer.vue"
import SearchContainer from "./components/SearchContainer.vue"
import ShopCarContainer from "./components/ShopCarContainer.vue"

// 创建路由对象
var router = new VueRouter({
  routes: [
    {path:'/',redirect: "/home"},
    { path : '/home', component: HomeContainer},
    { path : '/memenber', component: MemberContainer},
    { path : '/shopcar', component: SearchContainer},
    { path : '/search', component: ShopCarContainer},
  ],
  linkActiveClass: 'mui-active'//覆盖默认的link-active
  
})

// 把路由对象暴露出去
export default router