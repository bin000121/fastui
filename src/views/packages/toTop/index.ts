import { App } from 'vue'
import componentName from '/@/utils/const'

import Tooltip from '/@/views/packages/tooltip/Tooltip.vue'
import ToTop from '/@/views/packages/toTop/ToTop.vue'

export default {
    install (app: App): void {
        app.component(componentName.ToTop, ToTop)
    }
}