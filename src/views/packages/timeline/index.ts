import { App } from 'vue'
import componentName from '/@/utils/const'

import Timeline from '/@/views/packages/timeline/Timeline.vue'
import TimelineItem from '/@/views/packages/timeline/Timeline-item.vue'

export default {
    install (app: App): void {
        app.component(componentName.Timeline, Timeline)
        app.component(componentName.TimelineItem, TimelineItem)
    }
}