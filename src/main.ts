import Vue from 'vue'
import '@/style.css'
import App from './App.vue'
import router from './router'

// compiler模式
// new Vue({
//   el: '#app',
//   router,
//   components: { App },
//   template: '<App/>'
// })


// runtime
new Vue({
    router,
    render: h => h(App)
}).$mount('#app')
