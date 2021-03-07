<template>
    <div class="f-select-option">
        {{label || ''}}
    </div>
</template>

<script lang="ts">
import {
    defineComponent
} from 'vue'

export default defineComponent({
    name: 'FOption',
    props: {
      label: [String, Number],
      value: [String, Number]
    },
    setup () {

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
