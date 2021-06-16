import { App } from 'vue'
import componentName from '/@/utils/const'

import Carousel from './Carousel.vue'

export default {
    install (app: App): void {
        app.component(componentName.Carousel, Carousel)
    }
}