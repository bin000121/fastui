<template>
    <div class="dropdowns">
        <h2>Dropdowns 下拉菜单</h2>
        <p>可以在可切换显示的容器内放置一组操作或菜单。</p>

        <div>
            <h3>基本用法</h3>
            <p>基础示例。</p>

            <div>
                <f-dropdowns @action="c" trigger="click">
                    <span>下拉菜单</span>
                    <template #dropdown>
                        <f-dropdowns-item action="delete" @click="aaa"><span>1115666</span></f-dropdowns-item>
                        <f-dropdowns-item divided>222</f-dropdowns-item>
                        <f-dropdowns-item disabled>333</f-dropdowns-item>
                    </template>
                </f-dropdowns>
            </div>

            <div v-highlight>
                <pre><code>
    {{`<f-dropdowns>
        <button>666</button>
        <template #dropdown>
            <f-dropdowns-item>111</f-dropdowns-item>
            <f-dropdowns-item>222</f-dropdowns-item>
            <f-dropdowns-item>333</f-dropdowns-item>
        </template>
    </f-dropdowns>`}}
                </code></pre>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import {
    defineComponent
} from 'vue'
import FDropdowns from '../components/dropdowns/Dropdowns.vue'
import FDropdownsItem from '../components/dropdowns/Dropdowns-item.vue'

export default defineComponent({
    components: {
        FDropdowns,
        FDropdownsItem
    },
    setup () {
        const c = (a: any) => {
            console.log(a)
        }
        const aaa = () => {
            console.log(222222)
        }
        return{
            c,
            aaa
        }
    }
})
</script>

<style scoped>

</style>
