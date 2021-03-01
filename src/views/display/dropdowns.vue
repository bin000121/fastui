<template>
    <div class="dropdowns">
        <h2>Dropdowns 下拉菜单</h2>
        <p>可以在可切换显示的容器内放置一组操作或菜单。</p>

        <div>
            <h3>基本用法</h3>
            <p>基础示例。</p>

            <div>
                <f-dropdown>
                    <span>下拉菜单</span>
                    <template #dropdown>
                        <f-dropdown-item><span>111</span></f-dropdown-item>
                        <f-dropdown-item>222</f-dropdown-item>
                        <f-dropdown-item>333</f-dropdown-item>
                    </template>
                </f-dropdown>
            </div>

            <div v-highlight>
                <pre><code>
    {{`<f-dropdown>
        <button>666</button>
        <template #dropdown>
            <f-dropdown-item>111</f-dropdown-item>
            <f-dropdown-item>222</f-dropdown-item>
            <f-dropdown-item>333</f-dropdown-item>
        </template>
    </f-dropdown>`}}
                </code></pre>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import {
    defineComponent
} from 'vue'
import FDropdown from '../components/dropdowns/Dropdowns.vue'
import FDropdownItem from '../components/dropdowns/Dropdowns-item.vue'

export default defineComponent({
    components: {
        FDropdown,
        FDropdownItem
    },
    setup () {

    }
})
</script>

<style scoped>

</style>
