import { App } from 'vue'
import componentName from '/@/utils/const'

import Switch from '/@/views/packages/switch/Switch.vue'

export default {
    install (app: App): void {
        app.component(componentName.Switch, Switch)
    }
}