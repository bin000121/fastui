import { App } from 'vue'
import componentName from '/@/utils/const'

import Dropdowns from './Dropdowns.vue'
import DropdownsItem from './Dropdowns-item.vue'

export default {
    install (app: App): void {
        app.component(componentName.Dropdowns, Dropdowns)
        app.component(componentName.DropdownsItem, DropdownsItem)
    }
}