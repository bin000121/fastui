<template>
    <div>
        <h2>Upload 上传</h2>
        <p>用于图片、文件的上传组件，常见于表单中。</p>

        <div>
            <h3 id="ji_ben_yong_fa">基本用法
                <a href="#ji_ben_yong_fa" class="f-icon-anchor"></a>
            </h3>
            <p>最普通的用法。</p>

            <div>
                <fUpload/>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import fUpload from '/@/views/packages/upload/Upload.vue'
    import {
        defineComponent
    } from 'vue'

    export default defineComponent({
        components: {
            fUpload,
        },
        setup() {

        }
    })
</script>

<style scoped lang="scss">

</style>
