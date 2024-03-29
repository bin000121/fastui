import { App } from 'vue'
import componentName from '/@/utils/const'

import Menu from './Menu.vue'

export default {
    install (app: App): void {
        app.component(componentName.Menu, Menu)
    }
}