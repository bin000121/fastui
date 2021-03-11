<template>
    <div class="f-select-option" @click.stop="handleClickOption">
        {{label || ''}}
    </div>
</template>

<script lang="ts">
import {
    defineComponent,
    onMounted,
    getCurrentInstance
} from 'vue'

export default defineComponent({
    name: 'FOption',
    props: {
      label: [String, Number],
      value: [String, Number]
    },
    setup ({ label }) {
        let root: any
        const handleClickOption = (e: Event | any) => {
            console.log(root)
            if (!root.multiple) root.handleClick()
            root.getChose(label)
        }

        onMounted(() => {
            const instance: any = getCurrentInstance()
            root = instance.ctx.$parent.$parent
        })
        return{
            handleClickOption
        }
    }
})
</script>

<style scoped lang="scss">
.f-select-option{
    padding: 0 15px;
    font-size: 14px;
    height: calc(2.5em);
    line-height: calc(2.5em);
    &:hover{
        background-color: #eeeeee;
    }
}
</style>
