import { createApp } from 'vue'
import "vue-progressive-image/dist/style.css"
import './index.css'
import App from './App.vue'
import router from './router/index'


createApp(App).use(router).mount('#app')
