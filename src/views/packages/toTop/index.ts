import { App } from 'vue'
import componentName from '/@/utils/const'

import Tooltip from './Tooltip.vue'
import ToTop from './ToTop.vue'

export default {
    install (app: App): void {
        app.component(componentName.ToTop, ToTop)
    }
}