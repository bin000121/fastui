import { App } from 'vue'
import componentName from '/@/utils/const'

import Img from './Img.vue'

export default {
    install (app: App): void {
        app.component(componentName.Img, Img)
    }
}