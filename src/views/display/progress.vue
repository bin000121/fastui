<template>
    <div class="progress">
        <h2>Progress 进度条</h2>
        <p>用于告示用户当前任务的进度情况。</p>

        <div>
            <h3 id="ji_ben_yang_shi">基本样式
                <a href="#ji_ben_yang_shi" class="f-icon-anchor"></a>
            </h3>
            <p>进度条拥有的基础样式。</p>

            <div class="desc">
                其中属性 <b>value</b> / <b>v-model:value</b> 的值必须在 0 - 100 之间。
            </div>

            <div class="demo-progress">
                <f-progress
                    v-model:value="progress"
                    height="8px"
                />
            </div>
            <div class="demo-progress">
                <f-progress
                    v-model:value="progress2"
                    bar-color="#3cd0be"
                    height="8px"
                />
            </div>

            <div class="demo-progress">
                <f-progress
                    v-model:value="progress3"
                    bar-color="#ffc107"
                    track-color="#ccc"
                    height="8px"
                />
            </div>

            <div class="demo-progress">
                <f-progress
                    v-model:value="progress4"
                    bar-color="red"
                    track-color="#ccc"
                    height="8px"
                />
            </div>

            <div v-highlight>
                <pre><code>
    {{`<div class="demo-progress">
        <f-progress
            v-model:value="progress"
            height="8px"
        />
    </div>

    <div class="demo-progress">
        <f-progress
            v-model:value="progress2"
            bar-color="#3cd0be"
            height="8px"
        />
    </div>

    <div class="demo-progress">
        <f-progress
            v-model:value="progress3"
            bar-color="#ffc107"
            track-color="#ccc"
            height="8px"
        />
    </div>

    <div class="demo-progress">
        <f-progress
            v-model:value="progress4"
            bar-color="red"
            track-color="#ccc"
            height="8px"
        />
    </div>


    <script lang="ts">
    import {
        defineComponent,
        reactive,
        toRefs
    } from 'vue'

    export default defineComponent({
        setup () {
            const data = reactive({
                progress: 25,
                progress2: 50,
                progress3: 75,
                progress4: 100,
            })
            return{
                ...toRefs(data)
            }
        }
    })
    </script>



    <style lang="scss">
    .demo-progress{
        width: 500px;
        margin-bottom: 30px;
    }
    </style>`}}
                </code></pre>
            </div>
        </div>

        <div>
            <h3 id="ti_shi_wen_ben_xin_xi">提示文本
                <a href="#ti_shi_wen_ben_xin_xi" class="f-icon-anchor"></a>
            </h3>
            <p>在进度条后展示一段提示文本信息，增强进度情况。</p>

            <div class="desc">
                提示文本有2种模式，默认为外部展示，配置属性 <b>text-inside</b> 即可将文本内嵌。
            </div>

            <div class="demo-progress">
                <f-progress
                    v-model:value="progress"
                    bar-color="#1661ab"
                    height="20px"
                    text
                />
            </div>

            <div class="demo-progress">
                <f-progress
                    v-model:value="progress2"
                    bar-color="#3cd0be"
                    height="20px"
                    text-inside
                />
            </div>

            <div class="desc">
                属性 <b>text-style</b> 可以设置文本的样式。
            </div>

            <div class="demo-progress">
                <f-progress
                    v-model:value="progress3"
                    bar-color="#ffc107"
                    height="20px"
                    text-inside
                />
            </div>

            <div class="desc">
                属性 <b>format</b> 可以自定义文本的格式。
            </div>

            <div class="demo-progress">
                <f-progress
                    v-model:value="progress4"
                    bar-color="#3cd0be"
                    height="20px"
                    text-inside
                    :format="formatText"
                    :text-style="{
                        left: '50%',
                        top: '50%',
                        transform: 'translate(-50%, -50%)'
                    }"
                />
            </div>

            <div v-highlight>
                <pre><code>
    {{`<div class="demo-progress">
        <f-progress
            v-model:value="progress"
            bar-color="#1661ab"
            height="20px"
            text
        />
    </div>

    <div class="demo-progress">
        <f-progress
            v-model:value="progress2"
            bar-color="#ffc107"
            height="20px"
            text-inside
        />
    </div>

    <div class="demo-progress">
        <f-progress
            v-model:value="progress3"
            bar-color="#00e676"
            height="20px"
            text-inside
        />
    </div>

    <div class="demo-progress">
        <f-progress
            v-model:value="progress4"
            bar-color="#00e676"
            height="20px"
            text-inside
            :format="formatText"
            :text-style="{
                left: '50%',
                top: '50%',
                transform: 'translate(-50%, -50%)'
            }"
        />
    </div>


    <script lang="ts">
    import {
        defineComponent,
        reactive,
        toRefs
    } from 'vue'
    export default defineComponent({
        setup () {
            const data = reactive({
                progress: 25,
                progress2: 50,
                progress3: 75,
                progress4: 100
            })
            const formatText = (value: number) => {
                return value >= 100 ? '完成！' : value + '%'
            }
            return{
                ...toRefs(data),
                formatText
            }
        }
    })
    </script>


    <style lang="scss">
    .demo-progress{
        width: 500px;
        margin-bottom: 30px;
    }
    </style>`}}
                </code></pre>
            </div>
        </div>

        <div>
            <h3 id="yuan_jiao">圆角
                <a href="#yuan_jiao" class="f-icon-anchor"></a>
            </h3>
            <p>为进度条添加圆角样式。</p>

            <div class="demo-progress">
                <f-progress
                    rounded
                    height="20px"
                    v-model:value="progress"
                    text
                />
            </div>
            <div class="demo-progress">
                <f-progress
                    rounded
                    height="20px"
                    bar-color="#3cd0be"
                    v-model:value="progress2"
                    text-inside
                />
            </div>

            <div v-highlight>
                <pre><code>
    {{`<div class="demo-progress">
        <f-progress
            rounded
            height="20px"
            :value="25"
            text
        />
    </div>

    <div class="demo-progress">
        <f-progress
            rounded
            height="20px"
            bar-color="#3cd0be"
            :value="50"
            text-inside
        />
    </div>`}}
                </code></pre>
            </div>
        </div>

        <div>
            <h3 id="dong_xiao">动效
                <a href="#dong_xiao" class="f-icon-anchor"></a>
            </h3>
            <p>进度条拥有2中不同的动效（波浪、斑马纹）。</p>

            <div class="demo-progress">
                <f-progress
                    rounded
                    wave
                    height="25px"
                    :value="75"
                    text
                />
            </div>

            <div class="demo-progress">
                <f-progress
                    rounded
                    stripe
                    bar-color="#3cd0be"
                    height="25px"
                    :value="75"
                    text
                />
            </div>

            <div v-highlight>
                <pre><code>
    {{`<div class="demo-progress">
        <f-progress
            rounded
            wave
            height="25px"
            :value="75"
            text
        />
    </div>

    <div class="demo-progress">
        <f-progress
            rounded
            stripe
            bar-color="#3cd0be"
            height="25px"
            :value="75"
            text
        />
    </div>


    <style lang="scss">
    .demo-progress{
        width: 500px;
        margin-bottom: 30px;
    }
    </style>`}}
                </code></pre>
            </div>
        </div>

        <div>
            <h3 id="huan_xing">环形
                <a href="#huan_xing" class="f-icon-anchor"></a>
            </h3>
            <p>呈现一个环形的进度条。</p>

            <div class="desc">
                为其设置属性 <b>circle</b> 即可。
            </div>

            <div class="desc">
                有些属性是只在环形下生效的。
            </div>

            <div class="demo-progress-circle">
                <f-progress
                    circle
                    :size="100"
                    :value="progress5"
                    :stroke-width="5"
                    text
                />
                <f-progress
                    circle
                    :size="125"
                    bar-color="#3cd0be"
                    :value="progress5"
                    :stroke-width="7"
                    rounded
                    text
                    rotate="90"
                >
                    <template #text>
                        <b style="font-size: 12px">加载中...{{progress5}}%</b>
                    </template>
                </f-progress>
                <f-progress
                    circle
                    :size="150"
                    bar-color="#ffc107"
                    :value="progress5"
                    :stroke-width="9"
                    text
                    rotate="180"
                />
                <f-progress
                    circle
                    :size="175"
                    bar-color="red"
                    :value="progress5"
                    :stroke-width="11"
                    rounded
                    text
                    rotate="270"
                />
            </div>

            <div v-highlight>
                <pre><code>
    {{`<div class="demo-progress-circle">
        <f-progress
            circle
            :size="100"
            :value="progress"
            :stroke-width="5"
            text
        />
        <f-progress
            circle
            :size="125"
            bar-color="#3cd0be"
            :value="progress"
            :stroke-width="7"
            rounded
            text
            :rotate="90"
        >
            <template #text>
                <b style="font-size: 12px">加载中...\{\{progress\}\}%</b>
            </template>
        </f-progress>
        <f-progress
            circle
            :size="150"
            bar-color="#ffc107"
            :value="progress"
            :stroke-width="9"
            text
            :rotate="180"
        />
        <f-progress
            circle
            :size="175"
            bar-color="red"
            :value="progress"
            :stroke-width="11"
            rounded
            text
            :rotate="270"
        />
    </div>


    <script lang="ts">
    import {
        defineComponent,
        reactive,
        toRefs
    } from 'vue'

    export default defineComponent({
        setup () {
            const data = reactive({
                progress: 0,
            })
            setInterval(() => {
                data.progress += 5
                if (data.progress === 105) data.progress = 0
            }, 500)
            return { ...toRefs(data) }
        }
    })
    </script>


    <style lang="scss">
        .demo-progress-circle{
            display: flex;
            flex-wrap: wrap;
            align-items: center;
            justify-content: space-evenly;
        }
    </style>`}}
                </code></pre>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import {
    defineComponent,
    reactive,
    toRefs,
    onUnmounted
} from 'vue'
import fProgress from '/@/views/packages/progress/Progress.vue'
let timer: NodeJS.Timer
export default defineComponent({
    components: {
        fProgress
    },
    setup () {
        const data = reactive({
            progress: 25,
            progress2: 50,
            progress3: 75,
            progress4: 100,
            progress5: 0,
        })

        const formatText = (value: number) => {
            return value >= 100 ? '完成！' : `${value}%`
        }
        timer = setInterval(() => {
            data.progress5 += 5
            if (data.progress5 === 105) data.progress5 = 0
        }, 500)
        onUnmounted(() => {
            clearInterval(timer)
        })
        return{
            ...toRefs(data),
            formatText,
        }
    }
})
</script>

<style scoped lang="scss">
.demo-progress{
    width: 500px;
    margin-bottom: 30px;
}
.demo-progress-circle{
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-evenly;
}
</style>
