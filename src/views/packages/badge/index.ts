import { App } from 'vue'
import componentName from '/@/utils/const'

import Badge from '/@/views/packages/badge/Badge.vue'

export default {
    install (app: App): void {
        app.component(componentName.Badge, Badge)
    }
}