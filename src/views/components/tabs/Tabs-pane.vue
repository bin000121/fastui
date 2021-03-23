<template>
    <div class="f-tabs-pane" :id="id" v-show="isShow">
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
    CSSProperties
} from 'vue'
import { getRandomId } from '/@/utils/getRandomId'

export default defineComponent({
    props: {
        id: {
            type: String,
            default: () =>  getRandomId('f-tabs-pane')
        },
        label: String,
        name: String,
        icon: String,
        disabled: Boolean,
        iconStyle: {
            type: Object as PropType<CSSProperties>,
            default: () => ({ paddingRight: 'calc(.75em)'})
        }
    },
    setup (props) {
        const parent: any = inject('$parent')
        const {
            getInstance,
            root
        } = parent
        const isShow = ref(true)
        getInstance(getCurrentInstance())

        watch(() => root.ctx.current, (newV: string) => {
            isShow.value = newV ===props.name
        })

        onMounted(() => {
            isShow.value = root.ctx.value === props.name
        })
        return{
            isShow,
        }
    }
})
</script>

<style scoped lang="scss">
.f-tabs-pane{

}
</style>
