import { App } from 'vue'
import componentName from '/@/utils/const'

import DatePicker from './DatePicker.vue'

export default {
    install (app: App): void {
        app.component(componentName.DatePicker, DatePicker)
    }
}
