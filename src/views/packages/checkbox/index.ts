import { App } from 'vue'
import componentName from '/@/utils/const'
import Checkbox from '/@/views/packages/checkbox/Checkbox.vue'
import CheckboxGroup from '/@/views/packages/checkbox/Checkbox-group.vue'

export default {
    install (app: App): void {
        app.component(componentName.Checkbox, Checkbox)
        app.component(componentName.CheckboxGroup, CheckboxGroup)
    }
}