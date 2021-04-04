import { createApp } from 'vue'
import App from '/@/App.vue'
import router from './router'
import 'highlight.js/styles/solarized-light.css'
import '/@/assets/f-animate.css'
import '/@/assets/normalize.css'
import '/@/assets/font/iconfont.css'
import directive from '/@/utils/directive'
import message from '/@/views/packages/message/message'

const app = createApp(App)
app.use(message)
app.use(directive)
app.use(router)
app.mount('#app')
