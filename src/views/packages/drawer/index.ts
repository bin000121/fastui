import { App } from 'vue'
import componentName from '/@/utils/const'

import Drawer from '/@/views/packages/drawer/Drawer.vue'

export default {
    install (app: App): void {
        app.component(componentName.Drawer, Drawer)
    }
}