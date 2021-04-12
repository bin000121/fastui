import { App } from 'vue'
import componentName from '/@/utils/const'

import SubMenu from '/@/views/packages/sub-menu/Sub-menu.vue'

export default {
    install (app: App): void {
        app.component(componentName.SubMenu, SubMenu)
    }
}