<template>
    <div class="f-tabs-pane" v-show="isShow">
        <slot></slot>
    </div>
</template>

<script lang="ts">
import {
    defineComponent,
    ref,
    onMounted,
    watch,
    toRef,
    inject,
    getCurrentInstance,
    PropType,
    CSSProperties,
    nextTick
} from 'vue'
import { getRandomId } from '/@/utils/getRandomId'

export default defineComponent({
    props: {
        id: {
            type: String,
            default: () =>  getRandomId('f-tabs-pane')
        },
        label: String,
        name: {
            type: String,
            required: true
        },
        icon: {
            type: String,
            validator: (val: string) => val.startsWith('f-icon')
        },
        disabled: Boolean,
        iconStyle: {
            type: Object as PropType<CSSProperties>,
            default: () => ({ paddingRight: 'calc(.75em)', color: '#000'})
        }
    },
    setup (props) {
        const parent: any = inject('parent')
        const {
            getInstance,
            root,
        } = parent
        const isShow = ref(true)
        const son = getCurrentInstance()
        getInstance(son)
        watch(() => root.proxy.current, (newV: string) => {
            isShow.value = newV === props.name
        })
        onMounted(() => {
            isShow.value = root.proxy.current === props.name
        })
        return{
            isShow
        }
    }
})
</script>

<style scoped lang="scss">
.f-tabs-pane{
    font-size: 16px;
}
</style>
