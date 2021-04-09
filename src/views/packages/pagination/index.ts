import { App } from 'vue'
import componentName from '/@/utils/const'

import Pagination from '/@/views/packages/pagination/Pagination.vue'

export default {
    install (app: App): void {
        app.component(componentName.Pagination, Pagination)
    }
}