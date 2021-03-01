import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'highlight.js/styles/solarized-light.css'
import hljs from 'highlight.js'
import './assets/font/iconfont'

const app = createApp(App)

app.directive('highlight',  (el: any) => {
    const blocks = el.querySelectorAll('pre code')
    blocks.forEach((block: any) => {
        hljs.highlightBlock(block)
    })
})

app.use(router)
app.mount('#app')
