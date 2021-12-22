/*
 =========================================================
 * Vue Black Dashboard - v1.1.0
 =========================================================

 * Product Page: https://www.creative-tim.com/product/black-dashboard
 * Copyright 2018 Creative Tim (http://www.creative-tim.com)

 =========================================================

 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

 */
import Vue from "vue";
import VueRouter from "vue-router";
import RouterPrefetch from 'vue-router-prefetch'
import App from "./App";
// TIP: change to import router from "./router/starterRouter"; to start with a clean layout
import router from "./router/index";
import {DeepstreamClient} from '@deepstream/client'
import VueChartkick from 'vue-chartkick'
import Chart from 'chart.js'

import BlackDashboard from "./plugins/blackDashboard";
import i18n from "./i18n"
import './registerServiceWorker'
Vue.use(BlackDashboard);
Vue.use(VueRouter);
Vue.use(RouterPrefetch);
Vue.use(VueChartkick.use(Chart))

/* eslint-disable no-new */
new Vue({
  router,
  i18n,
  render: h => h(App),
  data: {
    ds: null,
  },
  created: function() {
    this.ds = new DeepstreamClient('localhost:6020')
    this.ds.login()
    this.ds.on('connectionStateChanged', connectionState => {
      console.log(connectionState)
    })
  }
}).$mount("#app");
