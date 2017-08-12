// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import router from './router'
import store from './vuex/store'
import VueResource from 'vue-resource'
import MuseUI from 'muse-ui'
import SwiperAwesome from 'vue-awesome-swiper'
import LazyLoad from 'vue-lazyload'
import VeeValidate from 'vee-validate';
import MintUI from 'mint-ui'
import * as SignaturePadLib from 'signature_pad';
Vue.prototype.$SignaturePad = SignaturePadLib.default
// Object.definePrototype(Vue.prototype, '$SignaturePad', { value: SignaturePad });
import App from './app'
// import 'muse-ui/dist/muse-ui.css'
// import 'muse-ui/dist/theme-light.css'
import 'mint-ui/lib/style.css'
import './assets/style/base.css'
// import './assets/style/index.less'
import './assets/js/rem.js'
import './assets/js/less.js'

Vue.config.productionTip = false

Vue.use(VueResource)
// Vue.use(MuseUI)
Vue.use(MintUI)
Vue.use(SwiperAwesome)
Vue.use(VeeValidate);

// Vue.use(LazyLoad, {
//   preLoad: 1.3,
//   error: './assets/loaderror.png',
//   loading: './assets/loading.gif',
//   attempt: 2,
//   listenEvents: ['scroll', 'mousewheel']
// })
Vue.http.options.emulateJSON = true
Vue.http.options.emulateHTTP = true

let vm = new Vue({
  el: '#app',
  router,
  store,
  template: '<App title="邦邦留学"/>',
  components: {
    App
  }
})