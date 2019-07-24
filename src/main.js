// 入口文件
import Vue from 'vue'
import app from './App.vue'
import './lib/mui/css/mui.css'
import './lib/mui/css/icons-extra.css'
//使用mint-ui组件
import { Header, Swipe, SwipeItem, Button, Lazyload, Switch } from 'mint-ui'
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);
Vue.component(Header.name, Header);
Vue.component(Button.name, Button)
Vue.use(Lazyload);
Vue.component(Switch.name, Switch);

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
Vue.filter('dataFormat', function (data, pattern = "YYYY-MM-DD HH:mm:ss") {
    return moment(data).format(pattern);
})

import VuePreview from 'vue-preview'
Vue.use(VuePreview)


import Vuex from "vuex"
Vue.use(Vuex)

var car = JSON.parse(localStorage.getItem("car")) || [];
var store = new Vuex.Store({
    state: {//this.$store.state
        car: car
    },
    mutations: {//this.$store.commit(方法名)
        addtoCar(state, goodsinfo) {
            var flag = false;
            state.car.some(item => {
                if (item.id == goodsinfo.id) {
                    item.number += parseInt(goodsinfo.number)
                    flag = true;
                    return true
                }
            });

            if (!flag) {
                state.car.push(goodsinfo);
            };
            localStorage.setItem("car", JSON.stringify(state.car))

        },
        updateGoodsinfo(state, goodsInfo) {
            state.car.some(item => {
                if (item.id == goodsInfo.id) {
                    item.number = parseInt(goodsInfo.number)
                    return true
                }
            })
            localStorage.setItem("car", JSON.stringify(state.car))
        },
        removeFromCar(state,id){
            state.car.some((item,i)=>{
                if(item.id == id){
                    state.car.splice(i,1)
                    return true;
                }
            })
            localStorage.setItem("car", JSON.stringify(state.car))
        },
        updateSelect(state,goodsinfo){
            state.car.some(item=>{
                if(item.id == goodsinfo.id){
                    item.select=goodsinfo.select
                }
            })
            localStorage.setItem("car", JSON.stringify(state.car))
        }
    },
    getters: {//this.$store.getters.
        getAllCount(state) {
            var c = 0;
            state.car.forEach(item => {
                c += item.number;
            })
            return c;
        },
        getNum(state) {
            var o = {};
            state.car.forEach(item => {
                o[item.id] = item.number;
            })
            return o;
        },
        getSelect(state){
            var o = {};
            state.car.forEach(item =>{
                o[item.id] = item.select
            })
            return o;
        },
        getCountPrice(state){
            var o ={
                count :0,
                amount:0
            }
            state.car.forEach(item=>{
                if(item.select ){
                    o.count += item.number
                    o.amount += item.number*item.price
                }
            })
            return o;
        }

    }
})

var vm = new Vue({
    el: '#app',
    render: c => c(app),
    router,
    store
})

