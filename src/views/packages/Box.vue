<template>
    <div :class="['f-box', ...getShadow]" :style="boxStyle">
        <div class="f-box--header" v-if="headerSlot">
            <slot name="header">
                <b>Default content</b>
            </slot>
            <p>subtitle</p>
        </div>
        <div :class="['f-box--body']">
            <slot></slot>
            <slot name="footer"/>
        </div>
    </div>
</template>

<script lang="ts">
import {
    defineComponent,
    ref,
    computed
} from 'vue'

export default defineComponent({
    props: {
        boxStyle: {
            type: Object,
            default: () => {}
        },
        shadow: {
            type: String,
            default: 'default'
        }
    },
    setup ({ shadow }, { slots }) {
        const headerSlot = slots.header
        const getShadow = computed(() => {
            let style: any = {
                default: 'f-box--shadow',
                hover: 'f-box--shadow--hover'
            }
            return shadow === 'none' ? [] : [style[shadow]]
        })
        return {
            headerSlot,
            getShadow
        }
    }
})
</script>

<style scoped lang="scss">
.f-box{
    border: 1px solid #ebeef5;
    border-radius: 5px;

    & > div {
        box-sizing: border-box;
    }
}
.f-box--shadow{
    box-shadow: 0 0 5px #eee, 0 2px 5px #999;
}

.f-box--shadow--hover{
    transition: box-shadow .15s;
    &:hover{
        box-shadow: 0 0 5px #eee, 0 2px 5px #999;
    }
}
.f-box--header{
    padding: 15px;
    border-bottom: 1px solid #ebeef5;
    font-size: 24px;
    p{
        font-size: 15px;
        margin: 3px 0 0 ;
        color: #666;
    }
}
.f-box--body{
    padding: 15px;
}
</style>
