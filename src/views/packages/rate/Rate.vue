<template>
    <div class="f-rate">
        <span
            v-for="num in countNum"
            :key="num"
            :class="{
                [icon]: true,
                'f-rate-item': true
            }"
            :style="getStyle"
        >
        </span>
    </div>
</template>

<script lang="ts">
    import {
        defineComponent,
        computed,
        ref,
        onMounted
    } from 'vue'

    export default defineComponent({
        props: {
            halfSelect: {
                type: Boolean,
                default: false
            },
            countNum: {
                type: Number,
                default: 5
            },
            value: Number,
            readonly: {
                type: Boolean,
                default: false
            },
            disabled: {
                type: Boolean,
                default: false
            },
            icon: {
                type: String,
                default: 'f-icon-star-filing',
            },
            fontSize: {
                type: [String, Number],
                default: 20,
            },
            color: {
                type: String,
                default: '#fd7716'
            }
        },
        setup (props) {
            const getStyle = computed(() => {
                return {
                    fontSize: typeof props.fontSize === 'string' ? props.fontSize : props.fontSize + 'px',
                    color: props.color
                }
            })
            return{
                getStyle
            }
        }
    })
</script>

<style scoped lang="scss">
.f-rate{
    display: inline-block;
}
.f-rate-item{
    cursor: pointer;
}

.f-rate-item + .f-rate-item{
    margin-left: 8px;
}
</style>