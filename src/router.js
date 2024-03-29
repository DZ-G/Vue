﻿import VueRouter from 'vue-router'
import HomeContainer from "./components/tabbar/HomeContaiber.vue"
import MemberContainer from "./components/tabbar/MemberContainer.vue"
import SearchContainer from "./components/tabbar/SearchContainer.vue"
import ShopCarContainer from "./components/tabbar/ShopCarContainer.vue"
import newsList from "./components/news/newsList.vue"
import newsInfo from "./components/news/newsInfo.vue"
import photoList from "./components/photos/photoList.vue"
import photoInfo from "./components/photos/photoInfo.vue"
import goodsList from "./components/goods/goodsList.vue"
import goodsInfo from "./components/goods/goodInfo.vue"
import goodsDesc from "./components/goods/goodsDesc.vue"
import goodsComm from "./components/goods/goodsComm.vue"


// 创建路由对象
var router = new VueRouter({
  routes: [
    { path:'/',redirect: "/home"},
    { path : '/home', component: HomeContainer},
    { path : '/memenber', component: MemberContainer},
    { path : '/shopcar', component: ShopCarContainer},
    { path : '/search', component:SearchContainer},
    { path : '/home/newsList',component:newsList},
    { path : '/home/newsInfo/:id',component:newsInfo},
    { path : '/home/photoList',component:photoList},
    { path : '/home/photoinfo/:id',component:photoInfo},
    { path : '/home/goodsList',component:goodsList},
    { path : '/home/goodsInfo/:id',component:goodsInfo},
    { path : '/home/goodsdesc/:id',component:goodsDesc,name:"goodsdesc"},
    { path : '/home/goodscomm/:id',component:goodsComm,name:"goodscomm"},

    
  ],
  linkActiveClass: 'mui-active'//覆盖默认的link-active
  
})

// 把路由对象暴露出去
export default router