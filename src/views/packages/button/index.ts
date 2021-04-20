import { App } from 'vue'
import componentName from '/@/utils/const'

import Button from './Button.vue'

export default {
    install (app: App): void {
        app.component(componentName.Button, Button)
    }
}