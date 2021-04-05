<template>
    <li
        :class="{
            'f-timeline-item': true,
            // 'f-timeline-item__alternate': alternate,
            ['f-timeline-item__' + type]: type !== 'left',
        }"
        :style="getBoxStyle"
    >
        <div class="f-timeline-item__icon-box">
            <i :class="icon" v-if="icon"></i>
            <div
                :class="{
                    'f-timeline-item__icon': true,
                    ['f-timeline-item__icon__' + status]: true
                }"
                v-else
            ></div>
        </div>
        <div class="f-timeline-item__through-line"></div>
        <div
            class="f-timeline-item-content"
            :style="getContentStyle"
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
    computed,
} from 'vue'

export default defineComponent({
    props: {
        status: {
            type: String,
            default: 'normal',
            validator: (val: string) => ['success', 'error', 'normal'].includes(val)
        },
        icon: String
    },
    setup() {
        const root = inject('$parent') as any
        let currentIndex = root.proxy.getInstanceNum()
        const reverse = ref(false)
        const alternate = ref(false)
        const type = ref('left')
        watchEffect(() => {
            reverse.value = root.proxy.reverse
            type.value = root.proxy.type
        })
        const getBoxStyle = computed(() => {
            if (type.value !== 'alternate') return {}
            return {
                'text-align': currentIndex % 2 === 0 ? 'left' : 'right'
            }
        })

        const getContentStyle = computed(() => {
            if (type.value !== 'alternate') return {}
            return {
                'text-align': currentIndex % 2 === 0 ? 'right' : 'left'
            }
        })

        return {
            reverse,
            alternate,
            type,
            currentIndex,
            getBoxStyle,
            getContentStyle,
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
    &:last-child{
        padding-bottom: 0;
    }
}
.f-timeline-item__alternate{
    padding: 0 0 20px;
    .f-timeline-item__icon-box, .f-timeline-item__through-line{
        left: 50% !important;
        transform: translateX(-50%) !important;
    }
    .f-timeline-item-content{
        display: inline-block;
        width: calc(50% - 20px);
    }
}
.f-timeline-item__right{
    padding: 0 30px 20px 0;
    &:last-child{
        padding-bottom: 0;
    }
    .f-timeline-item__icon-box{
        left: auto;
        right: 0;
    }
    .f-timeline-item__through-line{
        left: auto;
        right: 7px;
    }
    .f-timeline-item-content{
        text-align: right;
    }
}
.f-timeline-item__icon-box{
    position: absolute;
    left: 0;
    top: 3px;
    z-index: 2;
}
.f-timeline-item__icon{
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background-color: #fff;
    border: 2px solid transparent;
}
.f-timeline-item__through-line{
    position: absolute;
    top: 3px;
    bottom: -3px;
    left: 7px;
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
    color: #00cd00;
}
.f-timeline-item__icon__error{
    border-color: red;
    color: red;
}
li:last-child .f-timeline-item__through-line{
    display: none;
}
.f-timeline-item__reverse:first-child .f-timeline-item__through-line{
    display: none;
}
.f-timeline-item__reverse:last-child .f-timeline-item__through-line{
    display: block;
}
</style>