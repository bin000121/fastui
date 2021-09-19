<template>
    <Header showBorder></Header>
    <div class="doc">
        <Aside/>
        <div class="content" ref="content">
            <div class="content-inner">
                <router-view v-slot="{ Component }">
                    <component :is="Component" />
                </router-view>
            </div>
            <f-top
                :scroll-top="800"
                v-if="!route.path.includes('/toTop')"
                container="div.content"
            >
                <i class="f-icon-to-top"></i>
            </f-top>
        </div>
        <div
            :class="{
                'anchor': true,
                'anchor__hide': isAnchorHide,
            }"
            v-show="isShowAnchor"
        >
            <a
                v-for="([k, v], i) in tipList"
                :key="i"
                :href="'#' + v"
                :class="{
                        'is-active': i === isActive,
                        'is-anchorHide': isAnchorHide,
                    }"
                :title="k"
                @click="isActive = i"
            >{{k}}</a>
        </div>
    </div>
</template>

<script lang="ts">
import Header from '/@/components/header.vue'
import Aside from '/@/components/aside.vue'
import FTop from '/@/views/packages/toTop/ToTop.vue'
import { debounce, throttle } from '/@/utils/utils'

import {
    defineComponent,
    onMounted,
    onUnmounted,
    ref,
    watch,
    nextTick
} from 'vue'
import { useRoute } from 'vue-router'

export default defineComponent( {
    components: {
        Header,
        Aside,
        FTop
    },
    setup () {
        const content = ref(null)
        const isAnchorHide = ref(false)
        const isShowAnchor = ref(true)
        const tipList = ref([])
        const isActive = ref(0)
        const route = useRoute()
        const onResize = debounce(() => {
            let pageWidth = document.body.offsetWidth
            isAnchorHide.value = pageWidth < 1200
            updateAList(document.querySelectorAll("a[class^='f-icon']") as any)
        }, 100)

        let contentDom: HTMLElement
        let aOffsetTop: number[] = []

        let body = document.documentElement || document.body

        const handleClick = (index: number) => {
            isActive.value = index
            contentDom.scrollTop += 100
        }

        const onScroll = throttle(() => {
            let scrollTop = contentDom.scrollTop + 100
            for (let i = aOffsetTop.length - 1 ; i >= 0; i--) {
                if (scrollTop < aOffsetTop[0]) {
                    isActive.value = 0
                    break
                }
                if (scrollTop >= aOffsetTop[aOffsetTop.length - 1]) {
                    isActive.value = aOffsetTop.length - 1
                    break
                }
                if (scrollTop >= aOffsetTop[i]) {
                    isActive.value = i
                    break
                }
            }
        }, 25)

        const updateAList = (arr: any[]) => {
            aOffsetTop = []
            for (let i = 0; i < arr.length; i++) {
                aOffsetTop.push(arr[i].offsetTop)
            }
            isShowAnchor.value = true
            if (process.env.NODE_ENV !== 'development') window.scrollTo(0, 0)
        }

        onMounted(() => {
            contentDom = content.value!
            watch(() => route.path, (newV: any) => {
                if (!newV.includes('/doc/')) return
                isShowAnchor.value = false
                tipList.value = Object.entries(route.meta) as any
                // setTimeout(() => {
                //     updateAList(document.querySelectorAll("a[class='f-icon-anchor']") as any)
                // }, 50)
                nextTick(() => {
                    updateAList(document.querySelectorAll('a[class=\'f-icon-anchor\']') as any)
                })
            }, { immediate: true})
            onResize()
            window.addEventListener('resize', onResize)
            contentDom.addEventListener('scroll', onScroll)
        })

        onUnmounted(() => {
            window.removeEventListener('resize', onResize)
            window.removeEventListener('scroll', onScroll)
        })
        return {
            handleClick,
            isAnchorHide,
            isShowAnchor,
            tipList,
            isActive,
            route,
            content
        }
    }
})
</script>

<style scoped lang="scss">
.doc{
    width: 100%;
    height: calc(100% - 60px);
    display: flex;
    overflow: hidden;
}

.content{
    flex: 1 1 0;
    display: flex;
    justify-content: center;
    overflow-y: auto;
    height: 100%;
    background-color: #fff;
    padding: 0 30px 100px 30px;
    box-sizing: border-box;
    .content-inner{
        height: fit-content;
        width: 800px;
        max-width: 1000px;
    }
    & :deep(h3):hover{
        a{
            opacity: 1;
        }
    }
}
.anchor{
    font-family: Helvetica!important;
    width: 120px;
    max-height: 500px;
    background-color: transparent;
    border-left: 2px solid #eee;
    position: fixed;
    right: 17px;
    top: 62px;
    transition: right .15s ease-out;
    backdrop-filter: blur(5px);
    &:hover a.is-anchorHide{
        &::after, &::before{
            opacity: 0;
        }
    }
    a{
        position: relative;
        left: -2px;
        box-sizing: border-box;
        font-size: 14px;
        display: block;
        color: #333;
        width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        margin: 0 0 8px 0;
        transition: all .12s ease-out;
        padding-left: 15px;
        border-left: 2px solid transparent;
        &:last-child{
            margin-bottom: 0;
        }
        &:hover{
            color: #3cd0be;
        }
    }
    a.is-active{
        color: #3cd0be;
        font-size: 16px;
        font-weight: 700;
        border-left-color: #3cd0be;
        &.is-anchorHide::before{
            height: 10px;
            width: 10px;
            background-color: #3cd0be;
        }
    }
    .is-anchorHide{
        position: relative;
        width: 100%;
        height: 100%;
        &::after, &::before{
            content: '';
            position: absolute;
            left: 0;
            top: 0;
            height: 100%;
            width: 100%;
            background-color: #fff;
            z-index: 2;
            transition: opacity .15s ease-in-out;
        }
        &::before{
            position: absolute;
            border-radius: 50%;
            background-color: #999;
            height: 6px;
            width: 6px;
            z-index: 3;
            left: 6px;
            top: 50%;
            transform: translateY(-50%);
        }
    }
}
.anchor__hide{
    padding-right: 17px;
    right: -90px;
    &:hover{
        right: 0;
    }
}

</style>
