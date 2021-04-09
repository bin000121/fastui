import { App } from 'vue'
import componentName from '/@/utils/const'
import Breadcrumb from '/@/views/packages/breadcrumb/Breadcrumb.vue'
import BreadcrumbItem from '/@/views/packages/breadcrumb/Breadcrumb-item.vue'

export default {
    install (app: App): void {
        app.component(componentName.Breadcrumb, Breadcrumb)
        app.component(componentName.BreadcrumbItem, BreadcrumbItem)
    }
}