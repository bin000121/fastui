<template>
    <div class="f-dropdowns-item__divided" v-if="divided"></div>
    <li
        :class="{
            'f-dropdowns-item': true,
            'f-dropdowns-item__disabled': disabled
        }"
        @click.stop="handleClick"
        ref="dropdownsItem"
    >
        <slot></slot>
    </li>
</template>

<script lang="ts">
import {
    defineComponent,
    inject,
    ref
} from 'vue'

export default defineComponent({
    emits: ['click', 'action'],
    props: {
        disabled: Boolean,
        divided: Boolean,
        value: [String, Number, Boolean]
    },
    setup (props, { emit }) {
        const root = inject('$parent')
        const {
            toggleHideAndShow,
            ctx,
            hoverClose
        }: any = root
        const dropdownsItem = ref(null)
        const handleClick = () => {
            if (props.disabled || ctx.props.clickNotClose) return
            ctx.props.trigger === 'hover' ? hoverClose() : toggleHideAndShow()
            props.value && ctx.emit('action', props.value)
        }
        return{
            handleClick,
            dropdownsItem
        }
    }
})
</script>

<style scoped lang="scss">
.f-dropdowns-item{
    cursor: pointer;
    line-height: 32px;
    padding: 0 20px;
    color: #333;
    font-size: 14px;
    &:not(.f-dropdowns-item__disabled):hover{
        background-color: #eee;
    }
}
.f-dropdowns-item__disabled{
    color: #bbb;
    cursor: not-allowed;
}
.f-dropdowns-item__divided{
    height: 1px;
    background-color: #ddd;
    margin: 6px 0 5px;
}
</style>
