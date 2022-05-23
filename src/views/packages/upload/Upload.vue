<template>
    <div
        :class="{
            'f-upload': true,
            [className]: Boolean(className)
        }"
        :style="style"
        :id="id"
        @click.stop="handleClickUploadBtn"
    >
        <span class="f-icon-document"></span>
        <span style="font-size: 14px;color: #666">upload</span>
        <input
            type="file"
            id="f-upload-file-ipt"
            ref="fUploadFileIptDom"
            style="display: none"
            @input="iptChange"
            :accept="accept.join()"
            :multiple="multiple"
        >
    </div>
</template>

<script lang="ts">
    import { getRandomId } from '/@/utils/getRandomId'
    import {
        defineComponent,
        toRefs,
        reactive,
        onMounted
    } from 'vue'
    import type { PropType, CSSProperties  } from 'vue'
    import http from './http'
    import { isEmpty } from '/@/utils/utils'

    type TYPE_beforeUpload = (file: File | File[]) => boolean

    export default defineComponent({
        props: {
            action: {
                type: String,
                default: ''
            },
            multiple: {
                type: Boolean,
                default: false
            },
            withCredentials: {
                type: Boolean,
                default: false
            },
            headers: {
                type: Object,
                default: () => ({})
            },
            data: {
                type: Object,
                default: () => ({})
            },
            accept: {
                type: Array as PropType<string[]>,
                default: () => ['image/*']
            },
            style:{
                type: Object as PropType<CSSProperties>,
                default: () => ({})
            },
            className: {
                type: String,
                default: ''
            },
            beforeUpload: {
                type: Function as PropType<TYPE_beforeUpload>
            }
        },
        setup (props) {
            const httpConfig = {
                header: props.headers,
                url: props.action,
                withCredentials: props.withCredentials
            } as const

            const data = reactive({
                fUploadFileIptDom: null,
            })

            const handleClickUploadBtn = () => {
                if (!data.fUploadFileIptDom) return
                let fileDom: HTMLElement = data.fUploadFileIptDom!
                fileDom.click()
            }

            const iptChange = (e: Event) => {
                let files: File = props.multiple ? (e.target as any).files : (e.target as any).files[0]
                if (!isEmpty(props.beforeUpload) && typeof props.beforeUpload === 'function') {
                    if (!props.beforeUpload(files)) {
                        return e.preventDefault()
                    }
                }
                let fileReader = new FileReader() as FileReader
                let img = new Image() as HTMLImageElement
                console.dir(img)
                fileReader.readAsDataURL(files)
                fileReader.addEventListener('load', (e: ProgressEvent ) => {
                    img.src = (e.target as any).result as string
                    img.addEventListener('load', (imgE: Event) => {
                        createCanvas((imgE as any).path[0] as HTMLImageElement)
                    })
                })
            }

            const createCanvas = (img: HTMLImageElement) => {
                const canvas = document.createElement('canvas') as HTMLCanvasElement
                const ctx = canvas.getContext('2d') as CanvasRenderingContext2D
                canvas.width = 160
                canvas.height = 90
                ctx.drawImage(img, 0, 0, 160, 120)
                ctx.fillStyle = '#ff1ff1'
                ctx.fillText('这是文字的水印', 30, 30)
                canvas.toBlob((blob: any) => {
                    let fileReader = new FileReader() as FileReader
                    fileReader.readAsDataURL(blob)
                    fileReader.addEventListener('load', (e: ProgressEvent ) => {
                        console.log((e.target as any).result)
                    })
                }, 'image/png', 0.7)
            }

            // console.log(http)
            onMounted(() => {

            })

            return {
                ...toRefs(data),
                id: getRandomId('f-upload'),
                handleClickUploadBtn,
                iptChange,
            }
        }
    })
</script>

<style scoped lang="scss">
.f-upload{
    width: 100px;
    height: 100px;
    border-radius: 5px;
    border: 1px dashed #ccc;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    &:hover{
        border-color: var(--primary);
        .f-icon-document{
            color: var(--primary);
        }
    }
    .f-icon-document{
        font-size: 32px;
        color: #666;
    }
}

</style>
