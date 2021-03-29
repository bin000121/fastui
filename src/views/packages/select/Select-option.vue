<template>
    <li
        :class="{
            'f-select-option': true,
            'f-select-option__disabled': disabled,
            'f-select-option__isActive': isActive
        }"
        @click.stop="handleClickOption"
    >
        <template v-if="$slots.default">
            <slot></slot>
        </template>
        <template v-else>
            {{label || ''}}
        </template>
        <i class="f-icon-yes" v-if="isShowCheck"></i>
    </li>
</template>

<script lang="ts">
import {
    defineComponent,
    onMounted,
    watch,
    inject,
    getCurrentInstance,
    ref
} from 'vue'

export default defineComponent({
    name: 'FOption',
    props: {
        label: {
            type: [String, Number],
            required: true
        },
        value: {
            type: [String, Number, Boolean],
            required: true
        },
        disabled: Boolean
    },
    setup (props) {
        const {
            parent,
            collection,
            collectionInstance,
            getChose,
            toggleView,
        }: any = inject('parent')

        collection(props.label, props.value)
        const son = getCurrentInstance()
        collectionInstance(props.label, son)
        const isActive = ref(false)
        const isShowCheck = ref(true)
        const root: any = parent.props
        const isShowOption = ref(true)

        const handleClickOption = () => {
            if (props.disabled) return
            if (root.multiple) getChose(props.label, props.value, isActive.value)
            else {
                getChose(props.label, props.value)
                toggleView()
            }
        }

        watch(() => root.value, (newV: any) => {
            if (root.multiple) isActive.value = newV.includes(props.value)
            else isActive.value = newV === props.value
        }, { deep: true })

        onMounted(() => {
            isShowCheck.value = !root.removeCheckIcon
            if (typeof root.value === 'undefined') return
            // 如果用户绑定了v-model:value
            if (root.multiple) {
                // 多选模式下的绑定的数据必须是数组
                if (Array.isArray(root.value)) {
                    isActive.value = root.value.includes(props.value)
                } else console.warn('[fast-ui]: value is not of Array!')
            } else isActive.value = props.value === root.value
        })
        return{
            handleClickOption,
            isActive,
            isShowOption,
            isShowCheck,
        }
    }
})
</script>

<style scoped lang="scss">
.f-select-option{
    display: block;
    position: relative;
    box-sizing: border-box;
    white-space: nowrap;
    padding: 0 20px 0 15px;
    font-size: 14px;
    height: calc(2.5em);
    line-height: calc(2.5em);
    width: 100%;
    transition: background-color .08s ease-out;
    &:not(.f-select-option__isActive):not(.f-select-option__disabled):hover{
        background-color: #f2f2f2;
    }
    & > i{
        font-size: 14px;
        color: var(--primary);
        display: none;
        position: absolute;
        right: 5px;
        top: 50%;
        transform: translateY(-50%);
    }
}
.f-select-option__isActive{
    color: var(--primary);
    font-weight: bold;
    &:hover{
        background-color: #1661ab26;
    }
    & > i{
        display: block;
    }
}
.f-select-option__disabled{
    cursor: not-allowed;
    color: #aaa;
    user-select: none;
}
</style>
