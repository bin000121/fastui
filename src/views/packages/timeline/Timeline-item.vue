<template>
    <li
        :class="{
            'f-timeline-item': true,
            'f-timeline-item__alternate': alternate,
            'is-reverse': reverse,
        }"
        :style="`text-align: ${ alternate && currentIndex % 2 === 0 ? 'left' : 'right'};`"
    >
        <div
            class="f-timeline-item__icon"
            :class="{
                ['f-timeline-item__icon__' + status]: true
            }"
        ></div>
        <div class="f-timeline-item__through-line"></div>
        <div
            class="f-timeline-item-content"
            :style="`text-align: ${ alternate && currentIndex % 2 === 0 ? 'right' : 'left'};`"
        >
            <slot></slot>
        </div>
    </li>
</template>

<script lang="ts">
import {
    defineComponent,
    inject,
    ref,
    watchEffect,
} from 'vue'

export default defineComponent({
    props: {
        status: {
            type: String,
            default: 'normal',
            validator: (val: string) => ['success', 'error', 'normal'].includes(val)
        }
    },
    setup() {
        const root = inject('$parent') as any
        const currentIndex = ref(root.proxy.getInstanceNum())
        const reverse = ref(false)
        const alternate = ref(false)
        watchEffect(() => {
            reverse.value = root.proxy.reverse
            alternate.value = root.proxy.alternate
        })
        return {
            reverse,
            alternate,
            currentIndex
        }
    }
})
</script>

<style scoped lang="scss">
.f-timeline-item{
    --child-element: ':first-child';
    position: relative;
    font-size: 14px;
    min-height: 48px;
    padding: 0 0 20px 30px;
    color: #333;
}
.f-timeline-item__alternate{
    padding: 0 0 20px;
    .f-timeline-item__icon, .f-timeline-item__through-line{
        left: 50% !important;
        transform: translateX(-50%) !important;
    }
    .f-timeline-item-content{
        display: inline-block;
        width: calc(50% - 20px);
    }
}
.f-timeline-item__icon{
    position: absolute;
    left: 0;
    top: 3px;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: #fff;
    border: 2px solid transparent;
    z-index: 2;
}
.f-timeline-item__through-line{
    position: absolute;
    top: 3px;
    bottom: -3px;
    left: 6px;
    width: 2px;
    background-color: #eee;
    z-index: 1;
}
.f-timeline-item-content{
    height: 100%;
    width: 100%;
}
.f-timeline-item__icon__normal{
    border-color: var(--primary);
}
.f-timeline-item__icon__success{
    border-color: #00cd00;
}
.f-timeline-item__icon__error{
    border-color: red;
}
li:last-child .f-timeline-item__through-line{
    display: none;
}
li.is-reverse:first-child .f-timeline-item__through-line{
    display: none;
}
li.is-reverse:last-child .f-timeline-item__through-line{
    display: block;
}
</style>