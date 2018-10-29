import Vue from 'vue';
import App from './App';
import router from './router';
import axios from 'axios';
import util from './util'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css'; // 默认主题
// import 'element-ui/lib/theme-chalk/index.css'; // 默认主题
import '../static/css/viewPage.styl';
import "babel-polyfill";
import DataSource from 'vue-datasource';
import VueBus from 'vue-bus'

Vue.use(ElementUI);
Vue.use(util);
Vue.use(VueBus);
Vue.component("datasource", DataSource);
Vue.prototype.$axios = axios;
new Vue({
    router,
    render: h => h(App)
}).$mount('#app');
