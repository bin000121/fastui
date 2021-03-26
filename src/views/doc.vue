<template>
    <Header showBorder></Header>
    <div class="doc">
        <Aside></Aside>
        <div class="content">
            <router-view v-slot="{ Component }">
<!--                <transition mode="out-in" name="doc-sliderTo">-->
<!--                    <keep-alive>-->
                    <component :is="Component" />
<!--                    </keep-alive>-->
<!--                </transition>-->
            </router-view>
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
                        'is-active': i === isActive
                    }"
                    :title="k"
                    @click="isActive = i"
                >{{k}}</a>
            </div>
        </div>
        <f-top :scroll-top="800" v-show="!route.path.includes('toTop')">
            <i class="f-icon-to-top"></i>
        </f-top>
    </div>
</template>

<script lang="ts">
import Header from '/@/components/header.vue'
import Aside from '/@/components/aside.vue'
import FTop from '/@/views/packages/ToTop.vue'
import { debounce } from '/@/utils/debounce'
import { throttle } from '/@/utils/throttle'

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

        let aOffsetTop: number[] = []

        let body = document.documentElement || document.body

        const handleClick = (index: number) => {
            isActive.value = index
            body.scrollTop += 50
        }

        const onScroll = throttle(() => {
            let scrollTop = body.scrollTop + 15
            for (let i = aOffsetTop.length - 1 ; i >= 0; i--) {
                if (scrollTop < aOffsetTop[0]) {
                    isActive.value = 0
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
            window.scrollTo(0, 0)
        }

        onMounted(() => {
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
            window.addEventListener('scroll', onScroll)
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
        }
    }
})
</script>

<style scoped lang="scss">
.doc{
    height: calc(100% - 60px);
    display: flex;
    justify-content: center;
    padding: 0 2vw;
    min-width: 996px;
}

.content{
    flex-basis: 768px;
    max-width: 992px;
    padding: 20px 25px 200px;
    box-sizing: border-box;
    & :deep(h3):hover{
        a{
            opacity: 1;
        }
    }
}
.anchor{
    font-family: Helvetica;
    width: 120px;
    max-height: 500px;
    background-color: #fff;
    border-left: 2px solid #eee;
    position: fixed;
    right: 5px;
    top: 60px;
    transition: right .15s;
    backdrop-filter: blur(5px);
    a{
        position: relative;
        left: -2px;
        box-sizing: border-box;
        font-size: 12px;
        display: block;
        color: #999;
        width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        margin: 0 0 8px 0;
        transition: all .1s;
        padding-left: 15px;
        border-left: 2px solid transparent;
        &:last-child{
            margin-bottom: 0;
        }
    }
    a.is-active{
        color: #3cd0be;
        font-size: 16px;
        font-weight: 700;
        border-left-color: #3cd0be;
    }
}
.anchor__hide{
    right: -90px;
    &:hover{
        right: 0;
    }
}

</style>
