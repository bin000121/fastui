<template>
    <button
        :class="[
            'f-btn',
            ...getClassName,
            ...isRounded,
            ...btnSize,
            ...isOutline,
            ...isOneIcon
        ]"
        type="button"
        :disabled="disabled ? 'disabled' : ''"
        ref="buttonDom"
    >
        <i
            v-if="icon"
            :class="icon"
            class="f-btn-icon"
            :style="`margin-right: ${$slots.default ? '5px': ''};`"
        ></i>
        <slot></slot>
    </button>
</template>

<script lang="ts">
import {
    defineComponent,
    ref,
    computed,
    onMounted
} from 'vue'

export default defineComponent( {
    props: {
        type: String,
        icon: String,
        disabled: Boolean,
        rounded: Boolean,
        outline: Boolean,
        size: {
            type: String,
            default: 'normal'
        }
    },
    setup ({ type, disabled, rounded, size, outline, icon }, { slots }) {
        const buttonDom = ref(null)

        const getClassName = computed(() => {
            let color: any = {
                'primary': 'f-btn--primary',
                'success': 'f-btn--success',
                'danger': 'f-btn--danger',
                'info': 'f-btn--info',
                'warning': 'f-btn--warning',
                'text': 'f-btn--text',
            }
            if (!type) return disabled ? ['f-btn--default', 'is-disabled'] : ['f-btn--default']
            if (disabled) return [color[type], 'is-disabled']
            return [color[type]]
        })

        const isOutline = computed(() => {
            return outline ? ['f-btn--outline'] : []
        })

        const isRounded = computed(() => {
            return rounded ? ['f-btn--rounded'] : []
        })

        const btnSize = computed(() => {
            const sizeObj: any = {
                mini: 'f-btn--mini',
                small: 'f-btn--small',
                large: 'f-btn--large'
            }
            if (!sizeObj[size]) return []
            return [sizeObj[size]]
        })

        const isOneIcon = computed(() => {
            return icon && !slots.default ? ['f-btn-icon'] : []
        })

        onMounted(() => {
            const dom: HTMLElement = buttonDom.value as any
            !disabled && dom.removeAttribute('disabled')
        })
        return {
            getClassName,
            buttonDom,
            isRounded,
            btnSize,
            isOneIcon,
            isOutline
        }
    }
})
</script>

<style scoped lang="scss">
.f-btn{
    padding: 12px 16px;
    user-select: none;
    cursor: pointer;
    border: 1px solid transparent;
    border-radius: 3px;
    text-align: center;
    vertical-align: middle;
    display: inline-block;
    touch-action: manipulation;
    outline: 0;
    font-size: 14px;
    line-height: 1;
    transition: all .1s;
    box-sizing: border-box;
}
.f-btn-icon.f-btn{
    padding: 12px;
}
.f-btn + .f-btn{
    margin-left: 10px;
}
.f-btn-icon{
    font-size: 16px;
    color: inherit;
}
.f-btn--default{
    background-color: #fff;
    border-color: #ccc;
    color: #333;
    &:hover, &:focus{
        background-color: #ddd;
        border-color: #ccc;
    }
    &:active{
        background-color: #bbb;
        border-color: #8c8c8c;
    }
    &.is-disabled{
        color: #aaa;
        background-color: #fff;
        border-color: #ddd;
    }
}

.f-btn--primary{
    color: #fff;
    background-color: #1677b3;
    border-color: #0069d9;
    &:hover, &:focus{
        background-color: #2b73af;
        border-color: #1677b3;
    }
    &:active{
        background-color: #1661ab;
        border-color: #1661ab;

    }
    &.is-disabled{
        background-color: #9fc7e8;
        border-color: #9fc7e8;
    }
    &.f-btn--outline{
        color: #1677b3;
        border-color: #0069d9;
        &:hover, &:focus{
            background-color: #2b73af;
            color: #fff;
        }
        &:active{
            background-color: #1661ab;
            border-color: #1661ab;

        }
    }
}

.f-btn--success{
    color: #fff;
    background-color: #5cb85c;
    border-color: #4cae4c;
    &:hover, &:focus{
        background-color: #449d44;
        border-color: #398439;
    }
    &:active{
        background-color: #398439;
        border-color: #398439;
    }
    &.is-disabled{
        background-color: #a4e3c7;
        border-color: #a4e3c7;
    }
    &.f-btn--outline{
        color: #5cb85c;
        border-color: #5cb85c;
        &:hover, &:focus{
            background-color: #5cb85c;
            color: #fff;
        }
        &:active{
            background-color: #398439;
            border-color: #398439;
        }
    }
}

.f-btn--warning{
    color: #fff;
    background-color: #ffc107;
    border-color: #ffc107;
    &:hover, &:focus{
        background-color: #e0a800;
        border-color: #d39e00;
    }
    &:active{
        background-color: #d39e00;
        border-color: #c69500;
    }
    &.is-disabled{
        background-color: #ffe08a;
        border-color: #ffe08a;
    }
    &.f-btn--outline{
        color: #e0a800;
        border-color: #ffc107;
        &:hover, &:focus{
            background-color: #ffc107;
            color: #fff;
        }
        &:active{
            background-color: #d39e00;
            border-color: #c69500;
        }
    }
}

.f-btn--danger{
    color: #fff;
    background-color: #dc3545;
    border-color: #dc3545;
    &:hover, &:focus{
        background-color:  #c9302c;
        border-color: #c9302c;
    }
    &:active{
        background-color:#ac2925;
        border-color: #ac2925;

    }
    &.is-disabled{
        background-color: #f8a3b4;
        border-color: #f8a3b4;
    }
    &.f-btn--outline{
        color: #dc3545;
        border-color: #dc3545;
        &:hover, &:focus{
            background-color: #dc3545;
            color: #fff;
        }
        &:active{
            background-color: #ac2925;
            border-color: #ac2925;
        }
    }
}

.f-btn--info{
    color: #fff;
    background-color: #6c757d;
    border-color: #6c757d;
    &:hover, &:focus{
        background-color:  #5a6268;
        border-color: #545b62;
    }
    &:active{
        background-color: #4d4d4c;
        border-color: #4e555b;
    }
    &.is-disabled{
        background-color: #bbb;
        border-color: #bbb;
    }
    &.f-btn--outline{
        color: #6c757d;
        border-color: #6c757d;
        &:hover, &:focus{
            background-color: #5a6268;
            color: #fff;
        }
        &:active{
            background-color: #4d4d4c;
            border-color: #4e555b;
        }
    }
}

.f-btn--text{
    background-color: transparent;
    color: #1677b3;
    border: 0;
    padding-top: 15px;
    padding-bottom: 15px;
    padding-left: 0!important;
    padding-right: 0!important;
    &:hover, &:focus{
        color: #007acc;
    }
    &:active{
        color: #1677b3;
    }
    &.is-disabled{
        color: #9fc7e8;
    }
}
.is-disabled{
    cursor: not-allowed;
}
.f-btn--outline{
    background-color: #fff;
}
.f-btn--rounded{
    border-radius: 20px;
}
.f-btn--mini{
    padding: 6px 12px!important;
    font-size: 12px!important;
    .f-btn-icon{
        font-size: 14px;
    }
}
.f-btn--small{
    padding: 9px 15px!important;
    font-size: 12px!important;
    .f-btn-icon{
        font-size: 14px;
    }
}
.f-btn--large{
    .f-btn-icon{
        font-size: 18px;
    }
    padding: 15px 21px!important;
}
</style>
