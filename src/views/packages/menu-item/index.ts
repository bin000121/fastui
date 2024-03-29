import { App } from 'vue'
import componentName from '/@/utils/const'

import MenuItem from './Menu-item.vue'

export default {
    install (app: App): void {
        app.component(componentName.MenuItem, MenuItem)
    }
}