<template>
    <div class="f-dropdowns-item--divided" v-if="divided"></div>
    <li
        :class="['f-dropdowns-item', isDisabled]"
        @click="handleClick"
        ref="dropdownsItem"
    >
        <slot></slot>
    </li>
</template>

<script lang="ts">
import {
    defineComponent,
    getCurrentInstance,
    onMounted,
    computed,
    nextTick,
    ref
} from 'vue'

export default defineComponent({
    emits: ['click', 'action'],
    props: {
        disabled: Boolean,
        divided: Boolean,
        action: String
    },
    setup ({ disabled, action, divided }, { emit }) {
        const isDisabled = computed(() => {
            return disabled ?  'f-dropdowns-item--disabled' : ''
        })
        const dropdownsItem = ref(null)
        const _this: any = getCurrentInstance()
        const handleClick = () => {
            _this.ctx.$parent.$emit('toggleHideAndShow')
            emit('click')
            emit('action')
            // if (!disabled && action) _this.ctx.$parent.$parent.$emit('action', action)
        }
        return{
            handleClick,
            isDisabled,
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
    &:hover{
        background-color: #eee;
    }
}
.f-dropdowns-item--disabled{
    color: #bbb;
    cursor: not-allowed;
    &:hover{
        background-color: #fff;
    }
}
.f-dropdowns-item--divided{
    height: 1px;
    background-color: #ddd;
    margin: 6px 0 5px;
}
</style>
