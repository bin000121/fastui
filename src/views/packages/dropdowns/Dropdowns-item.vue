<template>
    <div class="f-dropdowns-item__divided" v-if="divided"></div>
    <li
        :class="{
            'f-dropdowns-item': true,
            ['f-dropdowns-item__' + size]: size !== 'default',
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
    setup (props) {
        const root = inject('parent')
        const {
            toggleHideAndShow,
            props: parentProps,
            ctx,
            hoverClose
        }: any = root
        const dropdownsItem = ref(null)
        const size = ref(parentProps.size)
        const handleClick = () => {
            if (props.disabled || parentProps.clickNotClose) return
            parentProps.trigger === 'hover' ? hoverClose() : toggleHideAndShow()
            props.value && ctx.emit('action', props.value)
        }
        return{
            handleClick,
            size,
            dropdownsItem
        }
    }
})
</script>

<style scoped lang="scss">
.f-dropdowns-item{
    cursor: pointer;
    height: calc(2.15em);
    line-height: calc(2.15em);
    padding: 0 calc(1.5em);
    color: #333;
    font-size: 14px;
    margin-left: -1px;
    &:not(.f-dropdowns-item__disabled):hover{
        background-color: #eee;
    }
}
.f-dropdowns-item__small{
    font-size: 12px!important;
}
.f-dropdowns-item__large{
    font-size: 16px!important;
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
