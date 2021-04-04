<template>
  <router-view />
</template>

<script lang="ts">
import {
  defineComponent
} from 'vue'

export default defineComponent({
    name: 'app',
    setup () {
        let dom = document.getElementById('loading') as HTMLElement | any
        dom?.parentNode?.removeChild?.(dom)
    }
})
</script>
<style>
#app{
  height: 100%;
}
</style>
