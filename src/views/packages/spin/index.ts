import { App } from 'vue'
import componentName from '/@/utils/const'

import Spin from './Spin.vue'

export default {
    install (app: App): void {
        app.component(componentName.Spin, Spin)
    }
}