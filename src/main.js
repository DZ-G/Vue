// 入口文件
import VueRouter from 'vue-router'
Vue.use(VueRouter)
import router from './router.js'

import VueResource from 'vue-resource'
Vue.use(VueResource)

import Vue from 'vue'
import app from './App.vue'
import './lib/mui/css/mui.css'
import './lib/mui/css/icons-extra.css'

import {Header,Swipe, SwipeItem } from 'mint-ui'
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);
Vue.component(Header.name,Header)


var vm = new Vue({
    el:'#app',
    render: c => c(app),
    router
})

