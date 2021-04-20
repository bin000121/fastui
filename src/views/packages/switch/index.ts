import { App } from 'vue'
import componentName from '/@/utils/const'

import Switch from './Switch.vue'

export default {
    install (app: App): void {
        app.component(componentName.Switch, Switch)
    }
}