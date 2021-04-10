import { App } from 'vue'
import componentName from '/@/utils/const'

import Popconfirm from '/@/views/packages/popconfirm/Popconfirm.vue'

export default {
    install (app: App): void {
        app.component(componentName.Popconfirm, Popconfirm)
    }
}