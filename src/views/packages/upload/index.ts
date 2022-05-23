import type { App } from 'vue'
import componentName from '/@/utils/const'

import Upload from './Upload.vue'

export default {
    install (app: App): void {
        app.component(componentName.Upload, Upload)
    }
}
