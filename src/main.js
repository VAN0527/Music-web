import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import VueLazyload from 'vue-lazyload'

Vue.use(VueLazyload, {
  error: 'http://s4.music.126.net/style/web2/img/default/default_album.jpg',
  loading: 'http://s4.music.126.net/style/web2/img/default/default_album.jpg'
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
