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
                            children: [
                                {
                                    label: '集美区',
                                    value: 'jimei'
                                },
                                {
                                    label: '思明区',
                                    value: 'siming'
                                },
                                {
                                    label: '翔安区',
                                    value: 'xiangan'
                                },
                                {
                                    label: '湖里区',
                                    value: 'huli'
                                },
                                {
                                    label: '海沧区',
                                    value: 'haicang'
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
                                },
                                {
                                    label: '台江区',
                                    value: 'taijiang'
                                },
                                {
                                    label: '晋安区',
                                    value: 'jinan'
                                }
                            ]
                        },
                        {
                            label: '泉州',
                            value: 'quanzhou',
                            disabled: true
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
                            value: 'yulin',
                            children: [
                                {
                                    label: '玉州区',
                                    value: 'yuzhouqu'
                                },
                                {
                                    label: '北流市',
                                    value: 'beiliushi'
                                },
                                {
                                    label: '博白县',
                                    value: 'bobaixian'
                                },
                                {
                                    label: '容县',
                                    value: 'rongxian'
                                },
                                {
                                    label: '福绵区',
                                    value: 'fumian'
                                },
                                {
                                    label: '玉东新区',
                                    value: 'yudong'
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
                                    label: '西乡塘区',
                                    value: 'xixiangtang'
                                },
                                {
                                    label: '朗东新区',
                                    value: 'langdong'
                                },
                                {
                                    label: '五象新区',
                                    value: 'wuxiang'
                                }
                            ]
                        },
                        {
                            label: '柳州市',
                            value: 'liuzhou',
                            children: [
                                {
                                    label: '城中区',
                                    value: 'chengzhong'
                                },
                                {
                                    label: '鱼峰区',
                                    value: 'yufeng'
                                },
                                {
                                    label: '柳南区',
                                    value: 'liunan'
                                },
                                {
                                    label: '柳北区',
                                    value: 'liubei'
                                }
                            ]
                        },
                        {
                            label: '桂林市',
                            value: 'guilin',
                            children: [
                                {
                                    label: '秀峰区',
                                    value: 'xiufeng'
                                },
                                {
                                    label: '叠彩区',
                                    value: 'diecai'
                                },
                                {
                                    label: '七星区',
                                    value: 'qixing'
                                },
                                {
                                    label: '雁山区',
                                    value: 'yanshan'
                                },
                                {
                                    label: '象山区',
                                    value: 'xiangshan'
                                },
                                {
                                    label: '临桂区',
                                    value: 'lingui'
                                }
                            ]
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