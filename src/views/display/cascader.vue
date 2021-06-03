<template>
    <div>
        <h2>Cascader 级联选择器</h2>
        <p>表单中常见的组件，能够从一组上下级相互关联的树形结构中进行选择。</p>
        <div>
            <h3>基本用法</h3>
            <p>基础的使用方式。</p>

            <div class="demo-cascader">
                <p>当前选中：{{cascaderValue}}</p>
                <f-cascader
                    v-model:value="cascaderValue"
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
    watch
} from 'vue'
import fCascader from '/@/views/packages/cascader/Cascader.vue'

export default defineComponent({
    components: {
        fCascader
    },
    setup () {
        const data = reactive({
            cascaderValue: [],
            options: [
                {
                    label: '福建省',
                    value: 'fujian',
                    children: [
                        {
                            label: '厦门市',
                            value: 'xiamen',
                            children: [
                                {
                                    label: '集美区',
                                    value: 'jimei'
                                },
                                {
                                    label: '思明区',
                                    value: 'siming'
                                }
                            ]
                        },
                        {
                            label: '福州市',
                            value: 'fuzhou',
                            children: [
                                {
                                    label: '闽侯县',
                                    value: 'minhou'
                                },
                                {
                                    label: '鼓楼区',
                                    value: 'gulou'
                                }
                            ]
                        },
                    ]
                },
                {
                    label: '广西壮族自治区',
                    value: 'guangxi',
                    children: [
                        {
                            label: '玉林市',
                            value: 'yulin',
                            children: [
                                {
                                    label: '玉州区',
                                    value: 'yuzhouqu'
                                },
                                {
                                    label: '福绵区',
                                    value: 'fumian'
                                }
                            ]
                        },
                        {
                            label: '南宁市',
                            value: 'nanning',
                            children: [
                                {
                                    label: '青秀区',
                                    value: 'qingxiu'
                                },
                                {
                                    label: '良庆区',
                                    value: 'liangqing'
                                }

                            ]
                        },
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