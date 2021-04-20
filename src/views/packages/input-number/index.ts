import { App } from 'vue'
import componentName from '/@/utils/const'
import InputNumber from './Input-number.vue'

export default {
    install (app: App) {
        app.component(componentName.InputNumber, InputNumber)
    }
}