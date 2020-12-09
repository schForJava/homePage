import Vue from "vue";
import Cookies from "js-cookie";
import "normalize.css/normalize.css";
import Element from "element-ui";
import "./styles/element-variables.scss";
import "./styles/elementui.css";
import "./styles/element-ui.scss";
import "@/styles/index.scss";
import App from "./App";
import store from "./store";
import router from "./router";
import axios from "axios";
import "./icons";
import "./permission";
import * as filters from "./filters";

// 封装的组件
import eleconfig from "@/components/index.js";
Vue.use(eleconfig);

// 封装的请求
import request from "@/utils/request";
Vue.prototype.$request = request;

// 封装的多环境，接口地址
import api from "@/api/apis/api.config.js";
Vue.prototype.$api = api;

// // 封装的导出pdf
// import htmlToPdf from '@/utils/htmlToPdf'
// Vue.use(htmlToPdf)
Vue.use(Element, {
    size: Cookies.get("size") || "medium",
});

Object.keys(filters).forEach((key) => {
    Vue.filter(key, filters[key]);
});

Vue.config.productionTip = false;

Vue.prototype.$axios = axios;

new Vue({
    el: "#app",
    router,
    store,
    render: (h) => h(App),
});