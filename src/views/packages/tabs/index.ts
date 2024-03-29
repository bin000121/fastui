import { App } from 'vue'
import componentName from '/@/utils/const'

import Tabs from './Tabs.vue'
import TabsPane from './Tabs-pane.vue'

export default {
    install (app: App): void {
        app.component(componentName.Tabs, Tabs)
        app.component(componentName.TabsPane, TabsPane)
    }
}