<template>
    <div
        class="f-img-container"
        :class="{
            'f-img-container__fail': !isHasImg
        }"
        :style="`width: ${width};height: ${height};`"
        ref="fImgContainer"
        :title="title || ''"
    >
        <div
            class="f-img-fail"
            v-if="!isHasImg"
        >
            <template v-if="$slots.fail">
                <slot name="fail"></slot>
            </template>
            <span v-else>图片加载失败!</span>
        </div>
        <div
            class="f-img-preview"
            v-if="isHasImg && showPreviewIcon"
            @click="showBigImg"
        >
            <span>
                <i class="f-icon-view"></i>
                <span>查看大图</span>
            </span>
        </div>
    </div>
    <transition name="f-img-show-big">
        <div
            class="f-img-show-big"
            v-show="isShowBig"
            ref="fImgShowBig"
        >
            <i class="f-icon-close-bold closeIcon" title="关闭查看大图" @click="closeShowBig"></i>
            <img :src="src" alt="">
            <div class="option-container">
                <i class="f-icon-zoom-in"></i>
                <i class="f-icon-zoom-out"></i>
            </div>
        </div>
    </transition>
</template>

<script lang="ts">
import {
    defineComponent,
    ref,
    onMounted,
    PropType
} from 'vue'
import { getScrollbarWidth } from '/@/utils/utils'

export default defineComponent({
    props: {
        lazyLoad: Boolean,
        objectFit: {
            type: String,
            default: 'fill',
            validator: (val: string) => ['fill', 'contain', 'none', 'cover', 'scale-down'].includes(val)
        },
        src: {
            type: String,
            required: true
        },
        title: String,
        width: {
            type: String,
            default: '100%',
            required: true
        },
        height: {
            type: String,
            default: '100%',
            required: true
        },
        preview: Boolean,
        showPreviewIcon: {
            type: Boolean,
            default: true
        },
        previewList: Array as PropType<string[]>
    },
    setup (props) {
        const isHasImg = ref(false)
        const isShowBig = ref(false)
        const fImgContainer = ref(null)
        const fImgShowBig = ref(null)
        let fImgContainerDom: HTMLElement
        let fImgShowBigDom: HTMLElement
        let scrollbarWidth: number
        const checkIsHasImg = () => {
            if (!props.src) return
            let imgInstance = new Image() as HTMLImageElement
            imgInstance.src = props.src
            imgInstance.onerror = () => {
                isHasImg.value = false
            }
            imgInstance.onload = () => {
                isHasImg.value = true
                createImg(imgInstance)
            }
        }

        const createImg = (instance: HTMLImageElement) => {
            instance.style.width = '100%'
            instance.style.height = '100%'
            instance.style.objectFit = props.objectFit
            instance.title = props.title || ''
            instance.alt = ''
            instance.className = 'f-img'
            fImgContainerDom.appendChild(instance)
        }

        const showBigImg = () => {
            document.body.style.cssText = `overflow: hidden; width: calc(100% - ${scrollbarWidth}px)`
            // const left = fImgContainerDom.style.left + fImgContainerDom.offsetWidth / 2
            // const top = fImgContainerDom.style.top + fImgContainerDom.offsetHeight / 2
            // document.body.style.setProperty('--transform-origin', `${left}px ${top}px`)
            isShowBig.value = true
        }

        const closeShowBig = () => {
            isShowBig.value = false
            setTimeout(() => {
                document.body.removeAttribute('style')
            }, 100)
        }

        onMounted(() => {
            fImgContainerDom = fImgContainer.value!
            fImgShowBigDom = fImgShowBig.value!
            scrollbarWidth = getScrollbarWidth()
            checkIsHasImg()
        })
        return{
            isHasImg,
            fImgContainer,
            isShowBig,
            showBigImg,
            closeShowBig,
        }
    }
})
</script>

<style scoped lang="scss">
.f-img-container{
    position: relative;
    display: inline-block;
    overflow: hidden;
    &:hover{
        .f-img-preview{
            opacity: 1;
        }
    }
}
.f-img-container__fail{
    background-color: #eee;
}
.f-img{
    display: block;
}
.f-img-fail{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: #999;
}
.f-img-preview{
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,.5);
    color: #fff;
    font-size: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    overflow: hidden;
    cursor: pointer;
    transition: opacity .15s;
    span{
        i{
            margin-right: 6px;
        }
    }
}
.f-img-show-big{
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100%;
    background-color: rgba(0,0,0,.4);
    transform-origin: center;
    z-index: 999;
    .closeIcon{
        position: absolute;
        right: 0;
        top: 0;
        color: #fff;
        font-size: 40px;
        background-color: rgba(0,0,0,.2);
        cursor: pointer;
    }
    img{
        position: relative;
        top: 50%;
        transform: translateY(-50%);
        display: block;
        max-width: 100%;
        max-height: 100%;
        cursor: grab;
        margin: auto;
        pointer-events: auto;
    }
    .option-container{
        position: absolute;
        bottom: 0;
        height: 45px;
        width: 100%;
        background-color: rgba(0,0,0,.4);
    }
    .option-container{
        display: flex;
        align-items: center;
        justify-content: center;
        i{
            font-size: 24px;
            cursor: pointer;
            color: #fff;
        }
        i + i{
            margin-left: 15px;
        }
    }
}
</style>