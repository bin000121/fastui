import { App } from 'vue'
import componentName from '/@/utils/const'

import Radio from './Radio.vue'
import RadioGroup from './Radio-group.vue'

export default {
    install (app: App): void {
        app.component(componentName.Radio, Radio)
        app.component(componentName.RadioGroup, RadioGroup)
    }
}