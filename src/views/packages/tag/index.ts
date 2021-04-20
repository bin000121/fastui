import { App } from 'vue'
import componentName from '/@/utils/const'

import Tag from './Tag.vue'

export default {
    install (app: App): void {
        app.component(componentName.Tag, Tag)
    }
}