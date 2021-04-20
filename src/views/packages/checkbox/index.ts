import { App } from 'vue'
import componentName from '/@/utils/const'
import Checkbox from './Checkbox.vue'
import CheckboxGroup from './Checkbox-group.vue'

export default {
    install (app: App): void {
        app.component(componentName.Checkbox, Checkbox)
        app.component(componentName.CheckboxGroup, CheckboxGroup)
    }
}