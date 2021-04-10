import { App } from 'vue'
import componentName from '/@/utils/const'

import Model from '/@/views/packages/model/Model.vue'

export default {
    install (app: App): void {
        app.component(componentName.Model, Model)
    }
}