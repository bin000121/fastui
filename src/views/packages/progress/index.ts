import { App } from 'vue'
import componentName from '/@/utils/const'

import Progress from './Progress.vue'

export default {
    install (app: App): void {
        app.component(componentName.Progress, Progress)
    }
}