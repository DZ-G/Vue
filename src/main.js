// 入口文件
import Vue from 'vue'
import app from './App.vue'
import './lib/mui/css/mui.css'
import './lib/mui/css/icons-extra.css'
//使用mint-ui组件
import {Header,Swipe, SwipeItem ,Button,Lazyload} from 'mint-ui'
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);
Vue.component(Header.name,Header);
Vue.component(Button.name,Button)
Vue.use(Lazyload);

import VueRouter from 'vue-router'
Vue.use(VueRouter)
import router from './router.js'

import VueResource from 'vue-resource'
Vue.use(VueResource)
//配置全局请求api
Vue.http.options.root = 'http://www.liulongbin.top:3005'
Vue.http.options.emulateJSON = true
//时间对象moment.JS
import moment from 'moment'
//定义全局的时间过滤器
Vue.filter('dataFormat',function( data, pattern="YYYY-MM-DD HH:mm:ss"){
    return moment(data).format(pattern);
})

import VuePreview from 'vue-preview'
Vue.use(VuePreview) 

var vm = new Vue({
    el:'#app',
    render: c => c(app),
    router
})

