import './assets/style.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import '@fortawesome/fontawesome-free/css/all.min.css'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.js'
// element-plus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
//AOS 
import AOS from 'aos'
import 'aos/dist/aos.css'
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(ElementPlus)
app.use(createPinia())
// đăng ký tất cả các icon của Element Plus vào Vue app
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
app.use(router)
app.mount('#app')
AOS.init();


