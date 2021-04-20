import { App } from 'vue'
import componentName from '/@/utils/const'

import Select from './Select.vue'
import SelectGroup from './Select-group.vue'
import SelectOption from './Select-option.vue'

export default {
    install (app: App): void {
        app.component(componentName.Select, Select)
        app.component(componentName.SelectGroup, SelectGroup)
        app.component(componentName.SelectOption, SelectOption)
    }
}