<template>
    <div
        :class="{
        'f-select': true,
        'f-select--disabled': disabled,
        }"
        @click="handleClick"
    >
        <input
            class="f-select-input"
            type="text"
            readonly
            ref="selectIpt"
            :placeholder="placeholder"
            autocomplete="off"
        >
        <span class="f-icon-arrow-down-bold f-select-arrow"></span>
        <transition name="f-select-fade" mode="out-in">
            <div v-if="$slots.default && showOptionList" class="f-option-list">
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
        options: Object as PropType<Options>,
    },
    setup () {
        const selectIpt = ref(null)
        const showOptionList = ref(false)

        const handleClick = () => {
            showOptionList.value = !showOptionList.value
            console.log(111)
        }

        onMounted(() => {

        })
        return{
            selectIpt,
            showOptionList,
            handleClick
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
        opacity: .45;
        width: 100%;
        height: 100%;
        z-index: 100;
    }
}
.f-select-arrow{
    display: inline-flex;
    color: #666;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    width: calc(2.5em);
}
.f-option-list{
    position: absolute;
    left: 0;
    top: 45px;
    width: 200px;
    z-index: 100;
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
        border-bottom-color: #ccc;
        left: 12px;
        top: -13px;
        z-index: 1;
    }
}
</style>
