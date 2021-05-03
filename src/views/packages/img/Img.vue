<template>
    <div
        class="f-img-container"
        :class="{
            'f-img-container__fail': isError
        }"
        :style="`width: ${width};height: ${height};`"
        ref="fImgContainer"
        :title="title || ''"
    >
        <img
            v-if="!isError && isLazyLoadShow"
            :src="src"
            :alt="alt || ''"
            :style="`height: 100%;width: 100%;object-fit: ${objectFit}`"
            :title="title || ''"
            class="f-img"
            ref="img"
            @load="imgLoad"
            @error="imgError"
        >
        <div
            class="f-img-loading"
            v-if="loading"
        >
            <template v-if="$slots.loading">
                <slot name="loading"></slot>
            </template>
            <f-spin v-else :size="30" tip="加载中..." inline></f-spin>
        </div>

        <div
            class="f-img-fail"
            v-if="isError"
        >
            <template v-if="$slots.fail">
                <slot name="fail"></slot>
            </template>
            <span v-else>图片加载失败!</span>
        </div>
        <div
            class="f-img-preview"
            v-if="!isError && !loading && preview"
            @click="showBigImg"
        >
            <span>
                <i class="f-icon-view"></i>
                <span>查看大图</span>
            </span>
        </div>
    </div>
    <transition name="f-img-show-big">
        <template v-if="preview">
            <div
                class="f-img-show-big"
                v-show="isShowBig"
                ref="fImgShowBig"
            >
                <div class="mask" @click="clickMask"></div>
                <i
                    class="f-icon-close-bold closeIcon"
                    title="关闭查看大图"
                    @click="closeShowBig"
                    v-if="showCloseIcon"
                ></i>
                <template v-if="isShowArrow">
                    <i
                        class="f-icon-arrow-left-bold arrow-left"
                        :class="{ 'arrow__disabled': previewIndex === 0 }"
                        title="上一张"
                        @click="prev"
                    ></i>
                    <i
                        class="f-icon-arrow-right-bold arrow-right"
                        :class="{ 'arrow__disabled': previewIndex === previewList.length - 1 }"
                        title="下一张"
                        @click="next"
                    ></i>
                </template>
                <div
                    class="translate-box"
                    style="transform: translate(0, 0)"
                    ref="translateBox"
                >
                    <img
                        draggable="false"
                        :src="isShowArrow ? previewList[previewIndex] : src"
                        alt=""
                        ref="bigImg"
                        style="transform: scale(1) translate(0, 0) rotate(0deg)"
                        @mousedown="handleTranslateStart"
                        @load="bigImgLoad"
                        @error="bigImgError"
                    >
                </div>
                <div class="option-container">
                    <i class="f-icon-zoom-in" @click="handleZoom('zoomIn')"></i>
                    <i class="f-icon-zoom-out" @click="handleZoom('zoomOut')"></i>
                    <i class="current-num" v-if="isShowArrow">
                        {{previewIndex + 1}} / {{previewList.length}}
                    </i>
                    <i class="f-icon-rotate-left" @click="handleRotate('left')"></i>
                    <i class="f-icon-rotate-right" @click="handleRotate('right')"></i>
                </div>

            </div>
        </template>
    </transition>
</template>

<script lang="ts">
import {
    defineComponent,
    ref,
    onMounted,
    onUnmounted,
    watch,
    nextTick,
    computed,
    PropType
} from 'vue'
import {
    getScrollbarWidth,
    isFirefox,
    isEmpty,
    throttle,
    debounce
} from '/@/utils/utils'
import fSpin from '/@/views/packages/spin/Spin.vue'
export default defineComponent({
    components: {
        fSpin
    },
    emits: ['error', 'load', 'error-big', 'load-big'],
    props: {
        lazyLoad: Boolean,
        lazyLoadDistance: {
            type: String,
            default: '150px'
        },
        viewportContainer: {
            type: String,
            default: 'body'
        },
        objectFit: {
            type: String as PropType<'fill' | 'contain' | 'none' | 'cover' | 'scale-down'>,
            default: 'fill',
            validator: (val: string) => ['fill', 'contain', 'none', 'cover', 'scale-down'].includes(val)
        },
        src: {
            type: String,
            required: true
        },
        title: String,
        alt: String,
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
        clickMaskNotClose: Boolean,
        pressEscNotClose: Boolean,
        showCloseIcon: {
            type: Boolean,
            default: true
        },
        preview: Boolean,
        previewList: {
            type: Array as PropType<string[]>,
            default: []
        },
        previewIndex: {
            type: Number,
            default: 0
        },
    },
    setup (props, { emit }) {
        const isLazyLoadShow = ref(!props.lazyLoad)
        const isError = ref(false)
        const isShowBig = ref(false)
        const loading = ref(true)
        const fImgContainer = ref(null)
        const fImgShowBig = ref(null)
        const img = ref(null)
        const bigImg = ref(null)
        const translateBox = ref(null)
        let fImgContainerDom: HTMLElement
        let fImgShowBigDom: HTMLElement
        let imgDom: HTMLImageElement
        let bigImgDom: HTMLImageElement
        let translateBoxDom: HTMLImageElement
        let scrollbarWidth: number
        const isShowArrow = ref(!isEmpty(props.previewList))

        const initIndex = () => {
            if (isEmpty(props.previewList)) return 0
            let idx = props.previewList.indexOf(props.src)
            return props.previewIndex || (idx !== -1 ? idx : 0)
        }

        const previewIndex = ref(initIndex())

        const imgLoad = () => {
            loading.value = false
            isError.value = false
            emit('load')

        }

        const imgError = () => {
            emit('error')
            loading.value = false
            isError.value = true
        }

        const showBigImg = () => {
            document.body.style.cssText = `overflow: hidden; width: calc(100% - ${scrollbarWidth}px)`
            bigImgDom.style.transform = 'scale(1) rotate(0)'
            translateBoxDom.style.transform = 'translate(0, 0)'
            isShowBig.value = true
        }

        const prev = () => {
            previewIndex.value--
            if (previewIndex.value < 0) previewIndex.value = 0
            bigImgDom.style.transform = 'scale(1) rotate(0)'
            translateBoxDom.style.transform = 'translate(0, 0)'
        }

        const next = () => {
            previewIndex.value++
            let max = props.previewList.length -1
            if (previewIndex.value > max) previewIndex.value = max
            bigImgDom.style.transform = 'scale(1) rotate(0)'
            translateBoxDom.style.transform = 'translate(0, 0)'
        }

        const bigImgLoad = () => {
            emit('load-big', previewIndex.value, props.previewList[previewIndex.value])
        }

        const bigImgError = () => {
            emit('error-big', previewIndex.value, props.previewList[previewIndex.value])
        }

        const closeShowBig = () => {
            isShowBig.value = false
            if (bigImgDom?.classList.contains('img-isMoving')) handleTranslateEnd()
            setTimeout(() => {
                document.body.removeAttribute('style')
            }, 50)
        }

        const clickMask = () => {
            if (props.clickMaskNotClose) return
            closeShowBig()
        }

        const getTransformProp = (target: string, props: 'scale' | 'rotate' | 'translate') => {
            const [reg, numReg] = {
                scale: [/scale\([0-5]\.?[0-9]*\)/, /\d\.?\d*/],
                rotate: [/rotate\(-?[0-9]+deg\)/, /-?\d+/],
                translate: [/translate\(.*?\)/, /-?[0-9]\.?-?[0-9]*/g]
            }[props]
            return target.match(reg)![0].match(numReg)!
        }

        const _handleZoom = (num: number) => {
            const target = bigImgDom.style.transform
            let scaleNum: string | number = getTransformProp(target,'scale')[0]
            let currentRotate = getTransformProp(target,'rotate')[0]
            scaleNum = parseFloat(scaleNum) + num
            if (scaleNum <= 0.3) scaleNum = .3
            if (scaleNum >= 4) scaleNum = 4
            bigImgDom.style.transform = `scale(${scaleNum}) rotate(${currentRotate}deg)`
        }

        const _handleRotate = (num: number) => {
            const target = bigImgDom.style.transform
            let rotateNum: number | string = getTransformProp(target,'rotate')[0]
            let currentScale = getTransformProp(target,'scale')[0]
            rotateNum = Number(rotateNum) + num
            bigImgDom.style.transform  = `scale(${currentScale}) rotate(${rotateNum}deg)`
        }

        const handleZoom = (type: 'zoomIn' | 'zoomOut') => {
            let step = .2
            let baseNum = type === 'zoomOut' ? 1 : -1
            _handleZoom(step * baseNum)
        }

        const mousewheel = (e: any) => {
            if (!isShowBig.value || !props.preview) return
            let zoomNum = e.deltaY * -1 / 1000
            _handleZoom(zoomNum)
        }

        const handleRotate = (type: 'left' | 'right') => {
            let base = type === 'right' ? 90 : -90
            _handleRotate(base)
        }

        let currentX: number
        let currentY: number
        let currentTranslate: number[]

        const handleTranslateStart = (e: MouseEvent) => {
            const target = translateBoxDom.style.transform
            document.addEventListener('mousemove', handleMove)
            document.addEventListener('mouseup', handleTranslateEnd)
            currentX = e.clientX
            currentY = e.clientY
            currentTranslate = getTransformProp(target,'translate').map(value => parseInt(value))
            bigImgDom.classList.add('img-isMoving')
        }

        const handleMove = throttle((e: MouseEvent) => {
            let left = currentTranslate[0] + e.clientX - currentX
            let top = currentTranslate[1] + e.clientY - currentY
            translateBoxDom.style.transform  = `translate(${left}px, ${top}px)`
        }, 25)

        // 检查图片是否完全超出视口，是就放弃本次拖拽结果
        const checkIsOverViewport = () => {
            const { left, right, top, bottom } = bigImgDom.getBoundingClientRect()
            let viewWidth = fImgShowBigDom.offsetWidth
            let viewHeight = fImgShowBigDom.offsetHeight
            let isOverWidth = left > viewWidth || right < 0
            let isOverHeight = top > viewHeight || bottom < 0
            if (isOverWidth || isOverHeight) {
                translateBoxDom.style.transform = 'translate(0, 0)'
                translateBoxDom.style.transition = 'transform .15s ease-in-out'
                setTimeout(() => translateBoxDom.style.transition = 'none', 150)
            }
        }

        const handleTranslateEnd = () => {
            document.removeEventListener('mousemove', handleMove)
            bigImgDom.classList.remove('img-isMoving')
            checkIsOverViewport()
        }

        const initLazyLoad = () => {
            let root: HTMLElement = document.querySelector(props.viewportContainer) || document.body
            const imgObserve = new IntersectionObserver((entires: IntersectionObserverEntry[]) => {
                if (entires[0].isIntersecting) {
                    isLazyLoadShow.value = true
                    imgObserve.unobserve(entires[0].target)
                }
            }, { root, rootMargin: `0px 0px ${ props.lazyLoadDistance} 0px` })
            imgObserve.observe(fImgContainerDom)
        }

        const onKeydownHandle = (e: KeyboardEvent) => {
            e.stopPropagation()
            if (e.key === 'Escape' && e.keyCode === 27 && !props.pressEscNotClose) closeShowBig()
            else return
        }

        watch(() => props.src, (newV: string) => {
            imgDom.src = newV
        })

        watch(() => props.lazyLoad, (newV: boolean) => {
            if (newV) initLazyLoad()
        })

        watch(() => props.previewList, (newV: string[]) => {
            isShowArrow.value = !isEmpty(newV)
        }, { deep: true })

        watch(() => props.preview, (newV: boolean) => {
            if (!newV) return
            nextTick(() => bigImgDom = bigImg.value!)
        })

        watch(() => props.previewIndex, (newV: number) => {
            if (isEmpty(props.previewList) || !props.preview) return
            previewIndex.value = newV
        })

        const eventName = isFirefox() ? 'DOMMouseScroll' : 'mousewheel'

        onMounted(() => {
            fImgContainerDom = fImgContainer.value!
            fImgShowBigDom = fImgShowBig.value!
            imgDom = img.value!
            bigImgDom = bigImg.value!
            translateBoxDom = translateBox.value!
            scrollbarWidth = getScrollbarWidth()
            document.addEventListener(eventName, mousewheel)
            document.addEventListener('keydown', onKeydownHandle)
            if (props.lazyLoad) initLazyLoad()
        })
        onUnmounted(() => {
            document.removeEventListener(eventName, mousewheel)
            document.removeEventListener('keydown', onKeydownHandle)
        })
        return{
            img,
            loading,
            isError,
            fImgContainer,
            isShowBig,
            bigImg,
            translateBox,
            fImgShowBig,
            isShowArrow,
            previewIndex,
            isLazyLoadShow,
            imgLoad,
            imgError,
            showBigImg,
            closeShowBig,
            clickMask,
            handleZoom,
            handleRotate,
            handleTranslateStart,
            handleTranslateEnd,
            handleMove,
            prev,
            next,
            bigImgLoad,
            bigImgError,
        }
    }
})
</script>

<style scoped lang="scss">
.f-img-container{
    box-sizing: border-box;
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
    overflow: hidden;
    display: block;
    vertical-align: bottom;
}
.f-img-loading{
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(0,0,0,.1);
    position: absolute;
    left: 0;
    top: 0;
    z-index: 2;
}
.f-img-fail{
    position: absolute;
    top: 50%;
    left: 50%;
    width: 100%;
    text-align: center;
    font-size: 14px;
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
    transform-origin: center;
    z-index: 1001;
    display: flex;
    align-items: center;
    justify-content: center;
    .mask{
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        background-color: rgba(0,0,0,.5);
    }
    i{
        color: #fff;
        cursor: pointer;
    }
    .closeIcon{
        position: absolute;
        right: 0;
        top: 0;
        color: #fff;
        font-size: 45px;
        background-color: rgba(0,0,0,.35);
        cursor: pointer;
        z-index: 1001;
    }
    .arrow-left, .arrow-right{
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        z-index: 99;
        font-size: 50px;
        background-color: rgba(0,0,0,.4);
        left: 15px;
        padding: 0 5px 0 0;
    }
    .arrow-right{
        left: unset;
        right: 15px;
        padding: 0 0 0 5px;
    }
    .arrow__disabled{
        color: #999;
        cursor: not-allowed;
        background-color: rgba(0,0,0,.1);
    }
    .translate-box{
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
    }
    img{
        vertical-align: bottom;
        display: block;
        max-width: 100%;
        max-height: 100%;
        cursor: grab;
        margin: auto;
        user-select: none;
        transition: transform .1s linear;
    }
    .img-isMoving{
        cursor: grabbing;
    }
    .option-container{
        display: flex;
        align-items: center;
        position: absolute;
        bottom: 45px;
        padding: 10px 15px;
        border-radius: 50px;
        background-color: rgba(0,0,0,.4);
    }
    .option-container{
        text-align: center;
        i{
            display: inline-block;
            font-size: 24px;
            width: 50px;
            height: 100%;
            text-align: center;
            transition: all .1s;
        }
    }
    .current-num{
        font-style: normal;
        font-size: 16px!important;
        margin: 0 6px;
        cursor: default;
    }
}
</style>