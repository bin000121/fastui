import { App } from 'vue'
import componentName from '/@/utils/const'

import MenuGroup from '/@/views/packages/menu-group/Menu-group.vue'

export default {
    install (app: App): void {
        app.component(componentName.MenuGroup, MenuGroup)
    }
}