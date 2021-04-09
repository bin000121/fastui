import { App } from 'vue'
import componentName from '/@/utils/const'

import Select from '/@/views/packages/select/Select.vue'
import SelectGroup from '/@/views/packages/select/Select-group.vue'
import SelectOption from '/@/views/packages/select/Select-option.vue'

export default {
    install (app: App): void {
        app.component(componentName.Select, Select)
        app.component(componentName.SelectGroup, SelectGroup)
        app.component(componentName.SelectOption, SelectOption)
    }
}