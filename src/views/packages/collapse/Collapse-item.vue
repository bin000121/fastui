<template>
    <div
        :class="{
            'f-collapse-item': true,
            'f-collapse-item__disabled': disabled,
            'f-collapse-item__simple': isSimple
        }"
        ref="fCollapseItem"
    >
        <div
            :class="{
                'header': true,
                'icon-placement-right': showArrow && iconPlacement === 'right',
            }"
            @click="toggle"
        >
            <i
                v-if="showArrow"
                :class="{
                    [icon]: true,
                    'icon-rotate': isShow
                }"
            />
            <span>{{title}}</span>
        </div>

<!--        <transition name="f-collapse-scale">-->
           <div
                :class="{
                    'content-box': true,
                    'isShow': isShow
                }"
           >
               <div
                   class="content"
                   ref="content"
               >
                   <slot></slot>
               </div>
           </div>
<!--        </transition>-->
    </div>
</template>

<script lang="ts">
import {
    defineComponent,
    ref,
    inject,
    onMounted,
    watch,
    getCurrentInstance
} from 'vue'
import { isEmpty } from '/@/utils/utils'
export default defineComponent({
    props: {
        title: String,
        name: {
            type: String,
            required: true
        },
        showArrow: {
            type: Boolean,
            default: true
        },
        disabled: Boolean,
        icon: {
            type: String,
            default: 'f-icon-arrow-right-bold'
        },
        iconPlacement: {
            type: String,
            default: 'left'
        }
    },
    setup (props) {
        const isShow = ref(false)
        const isSimple = ref(false)
        const content = ref(null)
        const fCollapseItem = ref(null)
        let contentDom: HTMLElement
        let fCollapseItemDom: HTMLElement
        const {
            root,
            accordionHandler,
            emitEvent,
            collectInstance
        } = inject('parent') as any
        collectInstance(getCurrentInstance()!)

        const toggle = () => {
            if (props.disabled) return
            if (root.props.accordion && !isShow.value) accordionHandler()
            isShow.value = !isShow.value
            emitEvent('change', isShow.value)
        }

        const initHeight = () => {
            fCollapseItemDom.style.setProperty('--height', contentDom.offsetHeight + 'px')
        }
        
        watch(() => root.props.value, (newV: string[]) => {
            if (isEmpty(newV) ||
                props.disabled ||
                !Array.isArray(newV)
            ) return
            if (root.props.accordion) {
                isShow.value = [newV[0]].includes(props.name)
                return
            }
            isShow.value = newV.includes(props.name)
        }, { immediate: true, deep: true })

        watch(() => root.props.simple, (newV: boolean) => {
            isSimple.value = newV
        }, { immediate: true })

        onMounted(() => {
            contentDom = content.value!
            fCollapseItemDom = fCollapseItem.value!
            initHeight()
        })
        return{
            isShow,
            isSimple,
            fCollapseItem,
            content,
            toggle
        }
    }
})
</script>

<style scoped lang="scss">
.f-collapse-item{
    --height: 1px;
    border: 1px solid #ddd;
    border-bottom: none;
    &:last-child{
        border-bottom: 1px solid #ddd;
    }
    .header{
        padding: 0 12px;
        height: 45px;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        background-color: #f7f7f7;
        cursor: pointer;
        i{
            margin-right: 12px;
            font-size: 14px;
            transform-origin: center;
            transition: transform .2s ease-in-out;
        }
        i.icon-rotate{
            transform: rotate(90deg);
        }
        span{
            font-size: 16px;
            line-height: 45px;
        }
    }
    .icon-placement-right{
        justify-content: space-between;
        i{
            order: 2;
            margin: 0;
        }
    }
    .content-box{
        height: 0;
        box-sizing: border-box;
        overflow: hidden;
        transition: height .25s ease-in-out;
    }
    .isShow{
        height: var(--height);
    }
    .content{
        box-sizing: border-box;
        font-size: 14px;
        word-break: break-all;
        padding: 15px 25px;
        &:deep(p){
            margin: 0;
        }
    }
}
.f-collapse-item__disabled{
    opacity: .4;
    user-select: none;
    .header{
        cursor: not-allowed;
    }
}
.f-collapse-item__simple{
    &:first-child{
        border-top: 1px solid #ddd;
    }
    border: 0;
    border-bottom: 1px solid #ddd;
    .header{
        background-color: #fff;
    }
    .content{
        padding: 0 20px 10px;
    }
}
</style>