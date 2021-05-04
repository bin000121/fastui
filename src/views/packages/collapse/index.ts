import { App } from 'vue'
import componentName from '/@/utils/const'

import Collapse from './Collapse.vue'

export default {
    install (app: App): void {
        app.component(componentName.Collapse, Collapse)
    }
}