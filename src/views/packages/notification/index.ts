import { App } from 'vue'
import componentName from '/@/utils/const'

import Notification from './Notification.vue'

export default {
    install (app: App): void {
        app.component(componentName.Notification, Notification)
    }
}