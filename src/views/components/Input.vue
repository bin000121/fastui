<template>
    <div :class="{
        'f-input-box': true,
        'f-input-box--disabled': disabled,
    }" v-if="['text', 'password'].includes(type)">
        <div class="f-input-prefix" v-if="$slots.prefix" ref="prefix">
            <slot name="prefix"></slot>
        </div>
        <input
            :class="{
                'f-input': true,
                'f-input--rounded': rounded,
                'f-input--disabled': disabled,
                'f-input--is-prefix': $slots.prefix,
                'f-input--is-push': $slots.push,
                'f-input--clearable': clearable
            }"
            ref="fInput"
            autocomplete="off"
            :autofocus="autofocus"
            :tabindex="tabindex"
            :type="type"
            :name="name"
            :readonly="readonly"
            :placeholder="placeholder"
            :maxlength="maxlength"
            @input="handleInput"
            @focus="focus"
            @blur="blur"
        >
        <span
            class="f-icon-box"
            ref="iconBox"
            v-if="showPass || clearable || showLimit"
        >
            <i
                v-if="showPass && type === 'password'"
                class="f-icon-view showPass"
                @click="showPassValue"
            ></i>
            <i
                v-if="clearable"
                class="f-icon-close-bold clearable"
                @click="clearInput"
            ></i>
            <span
                class="showLimit"
                v-if="showLimit && maxlength"
            >{{getLength}}</span>
        </span>

        <div class="f-input-push" v-if="$slots.push" ref="pushSlot">
            <slot name="push"></slot>
        </div>
    </div>
    <div :class="{
        'f-textarea-box': true,
        'f-textarea-box--disabled': disabled,
    }" v-if="type === 'textarea'">
        <textarea
            :class="{
                'f-textarea': true,
            }"
            :autofocus="autofocus"
            :tabindex="tabindex"
            :name="name"
            :placeholder="placeholder"
            :readonly="readonly"
            :style="`resize: ${resize}`"
            autocomplete="off"
            ref="fInput"
            :rows="rows"
            :maxlength="maxlength"
            @input="handleInput"
            @focus="focus"
            @blur="blur"
        ></textarea>
        <span
            class="f-textarea-showLimit"
            v-if="showLimit && maxlength"
        >{{getLength}}</span>
    </div>
</template>

<script lang="ts">
import {
    defineComponent,
    ref,
    onMounted,
    watch,
    computed,
    nextTick
} from 'vue'

export default defineComponent({
    emits: ['update:value', 'blur', 'change', 'focus', 'clear'],
    inheritAttrs: false,
    props: {
        value: [String, Number],
        type: {
            type: String,
            default: 'text',
            validator: (value: string) => ['textarea', 'password', 'text'].includes(value)
        },
        placeholder: {
            type: String,
            default: '请输入内容...'
        },
        name: String,
        tabindex: String,
        resize: String,
        maxlength: Number,
        showLimit: Boolean,
        autofocus: Boolean,
        rounded: Boolean,
        clearable: Boolean,
        readonly: Boolean,
        disabled: Boolean,
        showPass: Boolean,
        rows: Number,
    },
    setup (props, { emit, slots }) {
        const {
            showPass,
            clearable,
            showLimit,
            maxlength,
            readonly,
            disabled,
            value
        } = props
        const fInput = ref(null)
        const fTextarea = ref(null)
        const pushSlot = ref(null)
        const iconBox = ref(null)
        const isFocus = ref(false)
        const currentValue = ref(value)
        let fInputDom: HTMLElement | any
        let iconBoxDom: HTMLElement | any
        const clearInput = () => {
            if (!fInputDom.value || disabled || readonly) return
            if (showLimit && maxlength) currentValue.value = 0
            fInputDom.value = ''
            if (showPass) {// 还原密码框和展示密码图标
                fInputDom.type = 'password'
                iconBoxDom.children[0].className = 'f-icon-view showPass'
            }
            value && emit('update:value', '')
            emit('clear')
        }

        const showPassValue = () => {
            if (!fInputDom.value) return
            const showPassRightDom: HTMLElement = iconBoxDom.children[0]
            if (fInputDom.type === 'text') {
                fInputDom.type = 'password'
                showPassRightDom.className = 'f-icon-view showPass'
            } else {
                fInputDom.type = 'text'
                showPassRightDom.className = 'f-icon-view-off showPass'
            }
        }

        const handleInput = (e: any) => {
            if (disabled || readonly) return
            if (showLimit && maxlength) currentValue.value = e.target.value
            emit('update:value', e.target.value)
        }

        const focus = (e: Event) => {
            isFocus.value = true
            emit('focus', e)
        }

        const blur = (e: Event) => {
            isFocus.value = false
            emit('blur', e)
        }

        const initIconPosition = () => {
            if (!iconBoxDom) return
            const pushSlotDom: HTMLElement = pushSlot.value as any
            let count: number = 0
            if (showPass) count += 1
            if (clearable) count += 1
            iconBoxDom.style.width = 16 + 16 * count + 'px'
            iconBoxDom.style.right = ( slots.push ? pushSlotDom.offsetWidth : 0) + 4 + 'px'
            fInputDom.style.paddingRight = parseInt(iconBoxDom.offsetWidth) + 'px'
        }

        const getLength = computed(() => {
            return `${currentValue.value?.toString().length || 0}/${maxlength}`
        })

        onMounted(() => {
            fInputDom = fInput.value as any
            iconBoxDom = iconBox.value as any
            if (value) fInputDom.value = value

            watch(() => props.disabled, (newV: Boolean) => {
                if (!fInputDom) return
                if (newV) fInputDom.setAttribute('disabled', 'disabled')
                else fInputDom.removeAttribute('disabled')
            }, { immediate: true })
            // 设置清空按钮初始位置
            initIconPosition()
        })
        return{
            fInput,
            fTextarea,
            pushSlot,
            clearInput,
            showPassValue,
            handleInput,
            focus,
            blur,
            isFocus,
            iconBox,
            getLength
        }
    }
})
</script>

<style scoped lang="scss">
.f-input-box{
    position: relative;
    display: inline-flex;
    width: 100%;
    font-size: 14px;
}
.f-input-box--disabled, .f-textarea-box--disabled{
    &::before{
        content: '';
        display: block;
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        cursor: not-allowed;
        background-color: #f2f2f2;
        opacity: .45;
        z-index: 100;
        user-select: none;
    }
}
.f-input{
    position: relative;
    z-index: 99;
    display: inline-block;
    outline: 0;
    border: 1px solid #ccc;
    border-radius: 5px;
    padding: 0 12px;
    width: 100%;
    height: calc(2rem);
    font-size: 1rem;
    color: #333;
    line-height: 1.5;
    font-family: Helvetica;
    vertical-align: bottom;
    &:focus{
        caret-color: var(--primary);
        border-color: var(--primary);
        box-shadow: 0 0 0 .16em #1661ab33;
        transition: box-shadow .2s;
    }
}
.f-input--round{
    border-radius: 1.5rem;
}
.f-input--disabled{
    user-select: none;
}
.f-input--is-prefix{
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
}

.f-input--is-push{
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
}

.f-input-prefix, .f-input-push{
    display: inline-flex;
    height: calc(2rem);
    border: 1px solid #ddd;
    background-color: #f2f2f2;
    color: #444;
    line-height: calc(2rem);
    font-size: 1rem;
    padding: 0 12px;
    text-align: center;
    white-space: nowrap;
    cursor: default;
    & :deep(.f-btn){
        background-color: transparent;
        border: 0;
        margin: 0 -12px;
        padding: 0 12px;
        color: inherit;
        &:focus, &:active, &:hover{
            background-color: transparent;
        }
    }
}

.f-input-prefix{
    border-right: 0;
    border-radius: 5px 0 0 5px;
}

.f-input-push{
    border-left: 0;
    border-radius: 0 5px 5px 0;
}

.f-input--clearable{
    padding-right: 32px;
}


@each $key in (-webkit-, -moz-, -ms-) {
    input::#{$key}input-placeholder {
        color: #ccc;
        font-size: 1rem;
    }
}

.f-icon-box{
    position: absolute;
    z-index: 99;
    box-sizing: border-box;
    display: inline-flex;
    align-items: center;
    justify-content: space-around;
    user-select: none;
    padding: 0 2px;
    height: 100%;
    font-size: 14px;
    color: #ddd;
    min-width: 34px;
    .clearable, .showPass{
        cursor: pointer;
        &:hover{
            color: #aaa!important;
        }
    }
    .showLimit{
        text-align: center;
        padding: 0 4px;
        font-size: 12px;
        color: #aaa;
    }
}

.f-textarea-showLimit{
    position: absolute;
    right: 10px;
    bottom: 5px;
    text-align: center;
    padding: 0 4px;
    font-size: 12px;
    color: #aaa;
    z-index: 99;
}

/*文本域*/
.f-textarea-box{
    position: relative;
    display: inline-flex;
    width: 100%;
    font-size: 14px;
}
.f-textarea{
    position: relative;
    outline: 0;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-sizing: border-box;
    vertical-align: bottom;
    padding: 5px 10px;
    width: 100%;
    min-height: 32px;
    &:focus{
        caret-color: var(--primary);
        border-color: var(--primary);
        box-shadow: 0 0 0 .25em #1661ab33;
        transition: box-shadow .2s;
    }
}
.f-textarea::-webkit-scrollbar{
    width: 5px;
    height: 5px;
}

.f-textarea::-webkit-scrollbar-thumb{
    background-color: #ddd;
    border-radius: 50px;
    &:hover{
        background-color: #bbb;

    }
}
</style>
