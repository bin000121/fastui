import { App } from 'vue'
import componentName from '/@/utils/const'

import Box from './Box.vue'

export default {
    install (app: App): void {
        app.component(componentName.Box, Box)
    }
}