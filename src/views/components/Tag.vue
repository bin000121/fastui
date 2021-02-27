<template>
    <span :class="['f-tag', ...getClassName, ...tagSize]">
        <slot></slot>
    </span>
</template>

<script lang="ts">
import {
    defineComponent,
    ref,
    computed
} from 'vue'

export default defineComponent({
    props: {
        type: String,
        size: String
    },
    setup ({ type, size }) {
        const getClassName = computed(() => {
            const color: any = {
                primary: 'f-tag--primary',
                success: 'f-tag--success',
                danger: 'f-tag--danger',
                info: 'f-tag--info',
                warning: 'f-tag--warning',
                black: 'f-tag--black'
            }
            return !type ? ['f-tag--default'] : [color[type]]
        })

        const tagSize = computed(() => {
            const sizeObj: any = {
                mini: 'f-tag--mini',
                small: 'f-tag--small',
                large: 'f-tag--large'
            }
            return size ? [sizeObj[size]] : []
        })

        return{
            getClassName,
            tagSize
        }
    }
})
</script>

<style scoped lang="scss">
.f-tag{
    display: inline-block;
    height: 32px;
    line-height: 32px;
    padding: 0 10px;
    font-size: 12px;
    border-radius: 3px;
    & + & {
        margin-left: 15px;
    }
}
.f-tag--default{
    color: #999;
    background-color: #f5f5f5;
}
.f-tag--primary{
    color: #fff;
    background-color: #1677b3;
}

.f-tag--success{
    color: #fff;
    background-color: #5cb85c;
}
.f-tag--warning{
    color: #fff;
    background-color: #ffc107;
}
.f-tag--danger{
    color: #fff;
    background-color: #dc3545;
}
.f-tag--info{
    color: #fff;
    background-color: #5a6268;
}
.f-tag--black{
    color: #fff;
    background-color: #000;
}
</style>
