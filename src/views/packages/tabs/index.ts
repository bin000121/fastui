import { App } from 'vue'
import componentName from '/@/utils/const'

import Tabs from '/@/views/packages/tabs/Tabs.vue'
import TabsPane from '/@/views/packages/tabs/Tabs-pane.vue'

export default {
    install (app: App): void {
        app.component(componentName.Tabs, Tabs)
        app.component(componentName.TabsPane, TabsPane)
    }
}