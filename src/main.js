import '@/styles/common.scss'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'//实现pinia数据持久化

import App from './App.vue'
import router from './router'
import { lazyPlugin } from './directives'//实现懒加载
//进行全局注册
import { componentPlugin } from '@/components'






const app = createApp(App)

app.use(router)
app.use(lazyPlugin)
app.use(componentPlugin)



//注册持久化插件
const pinia = createPinia()
//还要使用pinia才能起到作用，文档里没有写这个
app.use(pinia)
pinia.use(piniaPluginPersistedstate)

app.mount('#app')


