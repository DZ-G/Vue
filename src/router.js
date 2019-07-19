import VueRouter from 'vue-router'
import HomeContainer from "./components/tabbar/HomeContaiber.vue"
import MemberContainer from "./components/tabbar/MemberContainer.vue"
import SearchContainer from "./components/tabbar/SearchContainer.vue"
import ShopCarContainer from "./components/tabbar/ShopCarContainer.vue"
import newsList from "./components/news/newsList.vue"
import newsInfo from "./components/news/newsInfo.vue"

// 创建路由对象
var router = new VueRouter({
  routes: [
    { path:'/',redirect: "/home"},
    { path : '/home', component: HomeContainer},
    { path : '/memenber', component: MemberContainer},
    { path : '/shopcar', component: SearchContainer},
    { path : '/search', component: ShopCarContainer},
    { path : '/home/newsList',component:newsList},
    { path : '/home/newsInfo/:id',component:newsInfo}

    
  ],
  linkActiveClass: 'mui-active'//覆盖默认的link-active
  
})

// 把路由对象暴露出去
export default router