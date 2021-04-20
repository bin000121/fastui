import { App } from 'vue'
import componentName from '/@/utils/const'

import MenuGroup from './Menu-group.vue'

export default {
    install (app: App): void {
        app.component(componentName.MenuGroup, MenuGroup)
    }
}