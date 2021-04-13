import type { App } from 'vue'
import type { MessageType } from './message'
import $msg from './message'

$msg.install = (app: App) => {
    app.provide('$message', $msg as MessageType)
}

export default $msg