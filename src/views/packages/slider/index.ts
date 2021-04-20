import { App } from 'vue'
import componentName from '/@/utils/const'

import Slider from './Slider.vue'

export default {
    install (app: App): void {
        app.component(componentName.Slider, Slider)
    }
}