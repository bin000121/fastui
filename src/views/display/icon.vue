<template>
    <div class="Icon">
        <h2>Icon 字体图标</h2>
        <p>开发中经常会使用到的字体图标</p>

        <div>
            <h3 id="ji_ben_shi_yong">基本使用
                <a href="#ji_ben_shi_yong" class="f-icon-anchor"></a>
            </h3>
            <p>直接将类名应用在 class 上即可。</p>

            <div class="desc">
                注意元素上类名过多时，必须将图标的类名放在第一位！
            </div>

            <div class="demo-icon">
                <span class="f-icon-search"></span>
                <i class="f-icon-close-bold"></i>
                <b class="f-icon-arrow-down-bold"></b>
                <f-button icon="f-icon-copy" type="primary"></f-button>
            </div>

            <div v-highlight>
                <pre><code>
    {{`<span class="f-icon-search"></span>
    <i class="f-icon-close-bold"></i>
    <b class="f-icon-arrow-down-bold"></b>
    <f-button icon="f-icon-copy" type="primary"></f-button>

    <style lang="scss">
        .demo-icon {
            & [class^='f-icon'] {
                font-size: 30px;
            }
            display: inline-flex;
            justify-content: space-between;
            align-items: center;
            width: 200px;
        }
    </style>`}}
                </code></pre>
            </div>
        </div>

        <div>
            <h3 id="suo_you">全部图标
                <a href="#suo_you" class="f-icon-anchor"></a>
            </h3>
            <p>点击图标复制类名到粘贴板。</p>
            <div class="iconList">
                <div class="iconOne" v-for="item in iconList" v-copy="item">
                    <div class="iconBox">
                        <i :class="item"></i>
                    </div>
                    <p>{{item}}</p>
                </div>
            </div>
        </div>

        <f-top :scroll-top="500">
            <i class="f-icon-to-top"></i>
        </f-top>
    </div>
</template>

<script lang="ts">
import {
    defineComponent,
} from 'vue'
import FButton from '/@/views/components/Button.vue'
import FTop from '/@/views/components/ToTop.vue'
export default defineComponent({
    components: {
        FButton,
        FTop
    },
    setup () {
        const iconList = [
            'f-icon-brush',
            'f-icon-clock',
            'f-icon-computer',
            'f-icon-coordinates',
            'f-icon-document',
            'f-icon-manage',
            'f-icon-picture_filling',
            'f-icon-picture',
            'f-icon-refresh',
            'f-icon-scan',
            'f-icon-setup_fill',
            'f-icon-setup',
            'f-icon-share',
            'f-icon-audio',
            'f-icon-microphone_fill',
            'f-icon-microphone',
            'f-icon-trash',
            'f-icon-trash_fill',
            'f-icon-search',
            'f-icon-backward',
            'f-icon-forward',
            'f-icon-info',
            'f-icon-warning',
            'f-icon-error',
            'f-icon-yes',
            'f-icon-success',
            'f-icon-to-top',
            'f-icon-anchor',
            'f-icon-view',
            'f-icon-view-off',
            'f-icon-user-filing',
            'f-icon-user',
            'f-icon-unlock',
            'f-icon-mima',
            'f-icon-nan',
            'f-icon-nv',
            'f-icon-user-filing2',
            'f-icon-copy',
            'f-icon-camera',
            'f-icon-direction-up',
            'f-icon-direction-down',
            'f-icon-direction-left',
            'f-icon-direction-right',
            'f-icon-lock',
            'f-icon-map',
            'f-icon-minus-circle',
            'f-icon-zoom-in',
            'f-icon-zoom-out',
            'f-icon-add-bold',
            'f-icon-arrow-left-bold',
            'f-icon-arrow-up-bold',
            'f-icon-close-bold',
            'f-icon-arrow-down-bold',
            'f-icon-minus-bold',
            'f-icon-arrow-right-bold',
            'f-icon-arrow-up-filling',
            'f-icon-arrow-down-filling',
            'f-icon-arrow-left-filling',
            'f-icon-arrow-right-filling',
            'f-icon-delete-filling',
            'f-icon-user-filling',
            'f-icon-star',
            'f-icon-star-filing'
        ]
        return {
            iconList
        }
    }
})
</script>

<style scoped lang="scss">
.demo-icon {
    & [class^='f-icon']{
        font-size: 30px;
    }
    display: inline-flex;
    justify-content: space-between;
    align-items: center;
    width: 200px;
}
.iconList{
    display: grid;
    grid-template-columns: repeat(auto-fill, 120px);
    grid-template-rows: repeat(auto-fill, 120px);
    grid-gap: 15px;
    justify-content: center;
    align-items: center;
    .iconOne{
        box-sizing: border-box;
        width: 120px;
        height: 120px;
        display: flex;
        flex-direction: column;
        text-align: center;
        cursor: pointer;
        border-radius: 5px;
        padding: 5px;
        transition: all .1s;
        border: 1px solid #eee;
        &:hover{
            background-color: var(--primary);
            color: #fff;
            border-color: var(--primary);
        }
        &>div {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            height: 80px;
            i{
                font-size: 45px;
            }
        }
        p{
            margin: 0;
            font-size: 15px;
        }
    }
}
</style>
