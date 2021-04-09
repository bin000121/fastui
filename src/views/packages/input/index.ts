import { App } from 'vue'
import componentName from '/@/utils/const'

import Input from '/@/views/packages/input/Input.vue'

export default {
    install (app: App): void {
        app.component(componentName.Input, Input)
    }
}