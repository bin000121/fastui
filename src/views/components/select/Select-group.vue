<template>
    <ul class="f-select-group">
        <li class="f-select-group__groupName">
            <span>{{groupName}}</span>
        </li>
        <slot></slot>
    </ul>
</template>

<script lang="ts">
import {
    defineComponent
} from 'vue'

export default defineComponent({
    props: {
        groupName: {
            type: String,
            required: true
        },
        disabled: Boolean
    }
})
</script>

<style scoped lang="scss">
.f-select-group{
    padding: 0;
    box-sizing: border-box;
    :deep(.f-select-option){
        padding: 0 24px!important;
    }
}
.f-select-group__groupName{
    position: relative;
    cursor: text;
    font-size: 13px;
    height: 24px;
    line-height: 24px;
    color: #999;
    text-align: center;
    span{
        display: inline-block;
        padding: 0 10px;
        position: relative;
        background-color: #fff;
        z-index: 2;
    }
    &::after{
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: calc(100% - 48px);
        height: 1px;
        background-color: #bbb;
        z-index: 1;
    }
}
</style>
