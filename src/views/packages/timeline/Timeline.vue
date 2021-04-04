<template>
    <ul
        :class="{
            'f-timeline': true,
            'is-reverse': reverse
        }"
    >
        <slot></slot>
    </ul>
</template>

<script lang="ts">
import {
    defineComponent,
    provide,
    reactive,
    getCurrentInstance,
    onMounted,
    ref
} from 'vue'
export default defineComponent({
    props: {
        order: {
            type: String,
            default: 'default',
            validator: (val: string) => ['default', 'revert'].includes(val)
        },
        reverse: Boolean,
        alternate: Boolean
    },
    setup(props) {
        let num = 0
        const getInstanceNum = () => {
            return ++num
        }
        provide('$parent', getCurrentInstance())
        // onMounted(() => {
        //     if (props.alternate) {
        //         instance.forEach(({ vnode: { el } }, i: number) => {
        //             el.
        //         })
        //     }
        //     console.log(instance)
        // })
        return{
            getInstanceNum
        }
    }
})
</script>

<style scoped lang="scss">
.f-timeline{
    position: relative;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    padding: 0;
    margin: 0;
    list-style: none;
    &.is-reverse{
        flex-direction: column-reverse;
    }
}
</style>