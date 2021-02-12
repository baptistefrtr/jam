import Vue from "vue";
import firebase from 'firebase';
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./registerServiceWorker";
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)

Vue.config.productionTip = false;

const configOptions = {
  apiKey: "AIzaSyBs9ZeK3cVRvWibyKk3UK5q9AIv4hCh4_U",
  authDomain: "jam-2021.firebaseapp.com",
  databaseURL: "https://area-ef715.firebaseio.com",
  projectId: "jam-2021",
  storageBucket: "jam-2021.appspot.com",
  messagingSenderId: "848101730716",
  appId: "1:848101730716:web:66cf81f3137b2948c24059"
};

const firebaseApp = firebase.initializeApp(configOptions);

Vue.prototype.$firebase = firebase;

const db = firebaseApp.firestore();
export default db;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
