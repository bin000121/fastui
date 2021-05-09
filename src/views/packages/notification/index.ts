import type { App } from 'vue'
import type { NotifyType } from './notification'
import $notify from './notification'

$notify.install = (app: App) => {
    app.provide('$notify', $notify as NotifyType)
}

export default $notify