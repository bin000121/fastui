<template>
    <div
        :class="{
            'f-switch-box': true,
            ['f-switch-box__' + size]: size !== 'default',
            'f-switch-box__disabled': disabled,
            'f-switch-box__loading': loading,
            ['checked__' + isChecked.toString()]: true
        }"
    >
        <input
            :id="id"
            type="checkbox"
            ref="switchRef"
            class="f-switch"
            @input="handleInput"
        />
        <label
            ref="switchLabelRef"
            :class="{
                'is-checked': isChecked,
                'is-inset': inset
            }"
        >
            <span
                :class="{
                    'control': true,
                    'is-checked': isChecked,
                    'control--shadow': activeColor || inactiveColor
                }"
            >
                <span class="f-switch__loading" v-if="loading"></span>
            </span>

            <span
                class="f-switch__inset-text"
                :style="insetTextStyle || {}"
                v-if="inset && (insetOffText || insetOnText)"
            >{{ isChecked ? insetOnText : insetOffText}}</span>
        </label>
        <span
            class="f-switch-label-text"
            style="color: #666"
            v-if="$slots.label"
        >
            <slot name="label"></slot>
        </span>
    </div>
</template>

<script lang="ts">
import {
    defineComponent,
    ref,
    onMounted,
    watch,
    PropType,
    CSSProperties
} from 'vue'
import { getRandomId } from '/@/utils/getRandomId'

export default defineComponent({
    name: 'FSwitch',
    emits: ['change', 'update:value'],
    props: {
        id: {
            type: String,
            default: () => getRandomId('f-switch')
        },
        value: Boolean,
        disabled: {
            type: Boolean,
            default: false
        },
        loading: {
            type: Boolean,
            default: false
        },
        size: {
            type: String,
            default: 'default',
            validator: (val: string) => ['small', 'default', 'large'].includes(val)
        },
        activeColor: String,
        activeText: String,
        inactiveText: String,
        inactiveColor: String,
        insetOffText: String,
        insetOnText: String,
        label: String,
        inset: Boolean,
        insetTextStyle: Object as PropType<CSSProperties>
    },
    setup (props, { emit }) {
        const switchRef = ref(null)
        const switchLabelRef = ref(null)
        const isChecked = ref(!!props.value)
        let switchDom: HTMLElement | any
        let switchLabelDom: HTMLElement

        const handleInput = (e: any) => {
            isChecked.value = e.target.checked
            emit('update:value', e.target.checked)
            emit('change', e.target.checked)
        }

        const initProperties = () => {
            if (props.inset) {
                if (props.loading) switchLabelDom.style.setProperty('--loading-color',  '#1661ab')
                switchLabelDom.style.setProperty('--active-track-color',  '#1661ab')
            }
            if (props.activeColor) {
                switchLabelDom.style.setProperty('--active-track-color', props.activeColor)
            }
            if (props.inactiveColor) {
                switchLabelDom.style.setProperty('--inactive-track-color', props.inactiveColor)
            }
            if (props.activeColor || props.inactiveColor || props.inset) {
                switchLabelDom.style.setProperty('--thumb-color', '#fff')
            }
        }

        onMounted(() => {
            switchDom = switchRef.value as any
            switchLabelDom = switchLabelRef.value as any
            if (props.disabled || props.loading) switchLabelDom.removeAttribute('for')
            else switchLabelDom.setAttribute('for', props.id)
            if (props.value) switchDom.setAttribute('checked', 'checked')
            else switchDom.removeAttribute('checked')
            initProperties()
        })


        watch(() => props.loading, (newV: boolean) => {
            newV ? switchLabelDom.removeAttribute('for') : switchLabelDom.setAttribute('for', props.id)
        })

        watch(() => props.disabled, (newV: boolean) => {
            newV ? switchLabelDom.removeAttribute('for') : switchLabelDom.setAttribute('for', props.id)
        })

        watch(() => props.disabled, (newV: boolean) => {
            if (newV) switchLabelDom.removeAttribute('for')
            else switchLabelDom.setAttribute('for', props.id)
        })

        watch(() => props.value, (newV: boolean) => {
            switchDom.checked = newV
            isChecked.value = newV
        })

        return{
            switchRef,
            switchLabelRef,
            handleInput,
            isChecked
        }
    }
})
</script>

<style scoped lang="scss">
.f-switch-box{
    display: inline-block;
    font-size: 18px;
    --active-track-color: #1661ab99;
    --inactive-track-color: #ccc;
    --thumb-hover-color: #1661ab26;
    --thumb-color: #1661ab;
    --loading-color: #fff;
}
.f-switch-box__small{
    font-size: 15px!important;
}
.f-switch-box__large{
    font-size: 21px!important;
}
.f-switch-box__disabled, .f-switch-box__loading{
    opacity: .5;
    label, .control{
        cursor: default;
    }
    label:hover .control{
        box-shadow: none;
        pointer-events: none;
    }
}
.f-switch{
    display: none;
}
label{
    display: inline-block;
    box-sizing: border-box;
    height: calc(.8em);
    width: calc(2.2em);
    border: 1px solid transparent;
    border-radius: calc(1em);
    cursor: pointer;
    transition: all 0.2s;
    position: relative;
    &:hover {
        .control{
            box-shadow: 0 0 0 .5rem var(--thumb-hover-color);
        }
        .control--shadow{
            box-shadow: 0 0 5px #666,0 0 0 .5rem #66666626;
        }
    }

}

label.is-inset{
    height: calc(1.25em);
    width: calc(2.8em);
}

/*控制手柄*/
.control{
    display: block;
    z-index: 999;
    width: calc(1.1em);
    height: calc(1.1em);
    position: absolute;
    top: 50%;
    border-radius: 50%;
    background-color: var(--thumb-color);
    cursor: pointer;
    transition: left .2s ease-out, background-color .25s ease-in;
    transform: translateY(-50%);
    .f-switch__loading{
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        width: calc(.55em);
        height: calc(.55em);
        border: 2px solid transparent;
        border-top-color: var(--loading-color);
        border-radius: 50%;
        animation: f-switch__loading-rotate 1s infinite linear;
    }
}
.control--shadow{
    box-shadow: 0 0 3px #888;
}

.f-switch-label-text{
    margin-left: 8px;
    font-size: 16px;
}

.f-switch__inset-text{
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    font-size: 12px;
    color: #fff;
    opacity: 0;
    transition: all .15s ease-in-out;
    user-select: none;
}

.checked__true{
    label{
        background-color: var(--active-track-color);
        .control{
            left: calc(2.3em - 1.1em + 2px);
        }
    }
    label.is-inset{
        .control{
            left: calc(2.8em - 1.1em - 3px);
        }
        .f-switch__inset-text{
            left: calc(.5em);
            opacity: 1;
        }
    }
}
.checked__false{
    label{
        background-color: var(--inactive-track-color);
        .control{
            left: -2px;
        }
    }
    label.is-inset{
        .control{
            left: 1px;
        }
        .f-switch__inset-text{
            left: calc(2.8em - .5em);
            opacity: 1;
        }
    }
}
</style>
