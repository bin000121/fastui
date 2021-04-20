import { App } from 'vue'
import componentName from '/@/utils/const'
import Breadcrumb from './Breadcrumb.vue'
import BreadcrumbItem from './Breadcrumb-item.vue'

export default {
    install (app: App): void {
        app.component(componentName.Breadcrumb, Breadcrumb)
        app.component(componentName.BreadcrumbItem, BreadcrumbItem)
    }
}