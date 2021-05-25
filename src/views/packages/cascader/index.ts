import { App } from 'vue'
import componentName from '/@/utils/const'

import Cascader from './Cascader.vue'

export default {
    install (app: App): void {
        app.component(componentName.Cascader, Cascader)
    }
}