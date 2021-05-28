<template>
    <div>
        <h2>Cascader 级联选择器</h2>
        <p>表单中常见的组件，能够从一组上下级相互关联的树形结构中进行选择。</p>
        <div>
            <h3>基本用法</h3>
            <p>基础的使用方式。</p>

            <div class="demo-cascader">
                <f-cascader
                    v-model:value="data"
                    :options="options"
                />
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import {
    defineComponent,
    reactive,
    toRefs,

} from 'vue'
import fCascader from '/@/views/packages/cascader/Cascader.vue'

export default defineComponent({
    components: {
        fCascader
    },
    setup () {
        const data = reactive({
            data: [],
            options: [
                {
                    label: '福建省',
                    value: 'fujian',
                    children: [
                        {
                            label: '厦门市',
                            value: 'xiamen',
                            disabled: true
                        },
                        {
                            label: '福州市',
                            value: 'fuzhou'
                        },
                        {
                            label: '泉州',
                            value: 'quanzhou'
                        },
                        {
                            label: '漳州',
                            value: 'zhangzhou'
                        }
                    ]
                },
                {
                    label: '广西壮族自治区',
                    value: 'guangxi',
                    children: [
                        {
                            label: '玉林市',
                            value: 'yulin'
                        },
                        {
                            label: '南宁市',
                            value: 'nanning'
                        },
                        {
                            label: '柳州市',
                            value: 'liuzhou'
                        },
                        {
                            label: '桂林市',
                            value: 'guilin'
                        }
                    ]
                },
            ]
        })
        return{
            ...toRefs(data),
        }
    }
})
</script>

<style scoped lang="scss">
.demo-cascader{

}
</style>