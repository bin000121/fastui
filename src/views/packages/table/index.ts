import { App } from 'vue'
import componentName from '/@/utils/const'

import Table from './Table.vue'

export default {
    install (app: App): void {
        app.component(componentName.Table, Table)
    }
}