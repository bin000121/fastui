<template>
    <transition :name="animation ? 'f-tag-close' : ''">
        <span
            class="f-tag"
            :class="{
            ['f-tag__' + size]: size !== 'default',
            ['f-tag--' + type]: type && !outline,
            ['f-tag__outline__' + type]: outline,
        }"
            :style="tagStyle || {}"
            v-if="isSHow"
        >
        <span v-if="dot" class="f-tab__dot"></span>
        <slot></slot>
        <i class="f-icon-close-bold f-tag__closeable" v-if="closeable" @click="closeTag"></i>
    </span>
    </transition>
</template>

<script lang="ts">
import {
    defineComponent,
    ref,
    computed
} from 'vue'
import type {
    PropType,
    CSSProperties
} from 'vue'
export default defineComponent({
    emits: ['close'],
    props: {
        type: {
            type: String,
            default: 'default',
            validator: (val: string) => ['default', 'primary', 'success', 'danger', 'info', 'warning', 'black'].includes(val)
        },
        size: {
            type: String,
            default: 'default',
            validator: (val: string) => ['default', 'small', 'large'].includes(val)
        },
        outline: Boolean,
        closeable: Boolean,
        animation: {
            type: Boolean,
            default: true
        },
        name: [String, Number, Boolean],
        dot: Boolean,
        tagStyle: Object as PropType<CSSProperties>
    },
    setup (props, { emit }) {
        const isSHow = ref(true)

        const closeTag = () => {
            isSHow.value = false
            emit('close', props.name || null)
        }

        return{
            isSHow,
            closeTag
        }
    }
})
</script>

<style scoped lang="scss">
.f-tag{
    box-sizing: border-box;
    display: inline-flex;
    height: 24px;
    align-items: center;
    padding: 0 10px;
    font-size: 12px;
    border-radius: 3px;
    color: #fff;
    & + & {
        margin-left: 15px;
    }
}
.f-tag__small{
    height: 20px;
    padding: 0 8px;
}
.f-tag__large{
    height: 28px;
    padding: 0 12px;
}
.f-tag--default{
    color: #333;
    background-color: #f5f5f5;
}
.f-tag__outline__default{
    color: #333;
    background-color: #fff;
    border: 1px solid #eee;
}
.f-tag--primary{
    background-color: var(--primary);
}
.f-tag__outline__primary{
    color: var(--primary);
    border: 1px solid var(--primary);
}
.f-tag--success{
    background-color: var(--success);
}
.f-tag__outline__success{
    color: var(--success);
    border: 1px solid var(--success);
}
.f-tag--warning{
    background-color: var(--warning);
}
.f-tag__outline__warning{
    color: var(--warning);
    border: 1px solid var(--warning);
}
.f-tag--danger{
    background-color: var(--error);
}
.f-tag__outline__danger{
    color: var(--error);
    border: 1px solid var(--error);
}
.f-tag--info{
    background-color: var(--info);
}
.f-tag__outline__info{
    color: var(--info);
    border: 1px solid var(--info);
}
.f-tag--black{
    background-color: black;
}
.f-tag__outline__black{
    color: black;
    border: 1px solid black;
}
.f-tab__dot{
    display: inline-block;
}
.f-tag__closeable{
    cursor: pointer;
    font-size: inherit;
    color: inherit;
    height: 1em;
    border: 1px solid transparent;
    border-radius: 50%;
    margin-left: 5px;
    transition: all .15s ease-in-out;
    &:hover{
        border-color: inherit;
    }
}
</style>
