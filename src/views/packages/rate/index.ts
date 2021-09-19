import { App } from 'vue'
import componentName from '/@/utils/const'

import Rate from './Rate.vue'

export default {
    install (app: App): void {
        app.component(componentName.Rate, Rate)
    }
}