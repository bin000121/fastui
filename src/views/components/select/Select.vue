<template>
    <div
        :class="{
        'f-select': true,
        // 'f-select--focus': focusOrBlur === 'focus',
        'f-select--disabled': disabled,
        }"
        ref="selectRoot"
        @click.stop="handleClick"
        v-clickOutside="handleClick"
    >
        <input
            class="f-select-input"
            type="text"
            readonly
            ref="selectIpt"
            :placeholder="placeholder"
            autocomplete="off"
        >
        <span
            :class="{
                'f-icon-arrow-down-bold': true,
                'f-select-arrow': true,
                'f-icon-rotate': showOptionList,
            }"
        ></span>
        <transition :name="animate ? 'f-select-fade' : ''" mode="out-in">
            <div
                v-if="$slots.default && showOptionList"
                class="f-option-list"
            >
                <slot></slot>
            </div>
        </transition>
    </div>
</template>

<script lang="ts">
import {
    PropType,
    defineComponent,
    ref,
    onMounted
} from 'vue'

interface Options {
    value: string | number;
    label: string | number;
    [key: string]: any
}
export default defineComponent({
    name: 'FSelect',
    emits: ['change', 'update:value'],
    props: {
        placeholder: {
            type: String,
            default: '请选择内容'
        },
        multiple: {
            type: Boolean,
            default: false
        },
        disabled: Boolean,
        readonly: Boolean,
        animate: {
            type: Boolean,
            default: true
        },
        options: Object as PropType<Options>
    },
    setup ({ disabled, readonly }, { emit }) {
        const selectRoot = ref(null)
        const selectIpt = ref(null)
        const showOptionList = ref(false)
        const focusOrBlur = ref('blur')
        let oldData = ''

        const handleClick = () => {
            if (disabled || readonly) return
            // changeFocusOrBlur('focus')
            console.log('开')
            showOptionList.value = !showOptionList.value
            console.log('关')
        }

        const getChose = (data: number | string) => {
            if (oldData === data) return
            (selectIpt.value as any).value = data
            emit('change', data)
            emit('update:value', data)
        }


        const changeFocusOrBlur = (type: string) => {
            focusOrBlur.value = type
        }


        onMounted(() => {

        })
        return{
            selectRoot,
            selectIpt,
            showOptionList,
            handleClick,
            getChose,
            focusOrBlur,
            changeFocusOrBlur
        }
    }
})
</script>

<style scoped lang="scss">
.f-select{
    position: relative;
    border: 1px solid #ccc;
    min-height: 32px;
    box-sizing: border-box;
    border-radius: 5px;
    display: inline-flex;
    cursor: pointer;
    .f-select-input{
        flex-grow: 1;
        display: inline-block;
        outline: none;
        border: 0;
        margin: 0;
        padding: 10px 0 10px 10px;
        cursor: pointer;
        overflow: hidden;
        user-select: none;
        border-radius: 5px;
        vertical-align: bottom;
        box-sizing: border-box;
    }
}
.f-select--disabled{
    cursor: not-allowed;
    &::before{
        content: '';
        display: block;
        position: absolute;
        top: 0;
        left: 0;
        background-color: #f2f2f2;
        opacity: .65;
        width: 100%;
        height: 100%;
        z-index: 100;
    }
}
/*.f-select--focus{*/
/*    border-color: var(--primary);*/
/*    box-shadow: 0 0 0 .2em #1661ab33;*/
/*    transition: box-shadow .2s;*/
/*}*/
.f-select-arrow{
    display: inline-flex;
    color: #666;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    width: calc(2.5em);
    transition: transform .25s;
}
.f-icon-rotate{
    transform: rotate(180deg);
}
.f-option-list{
    box-sizing: border-box;
    position: absolute;
    left: 0;
    top: 45px;
    min-width: 200px;
    max-height: 260px;
    z-index: 100;
    background-color: #fff;
    border: 1px solid #ccc;
    border-radius: 5px;
    padding: 5px 0;
    &::before, &::after{
        content: '';
        display: block;
        position: absolute;
        width: 0;
        height: 0;
        border: 6px solid transparent;
        border-bottom-color: #fff;
        left: 12px;
        top: -12px;
        z-index: 2;
    }
    &::after{
        content: '';
        display: block;
        position: absolute;
        width: 0;
        height: 0;
        border: 6px solid transparent;
        border-bottom-color: #ddd;
        left: 12px;
        top: -13px;
        z-index: 1;
    }
}
</style>
