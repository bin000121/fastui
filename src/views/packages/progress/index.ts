import { App } from 'vue'
import componentName from '/@/utils/const'

import Progress from '/@/views/packages/progress/Progress.vue'

export default {
    install (app: App): void {
        app.component(componentName.Progress, Progress)
    }
}