<template>
    <input
        type="checkbox"
        :id="getRandom"
        class="f-switch"
        ref="switchDom"
        :value="value"
    />
    <label :for="getRandom">
        <span class="control"></span>
    </label>
</template>

<script lang="ts">
import {
    defineComponent,
    nextTick,
    ref,
    computed,
    watch
} from 'vue'

export default defineComponent({
    props: {
        value: Boolean
    },
    setup ({ value }) {
        const switchDom: any = ref(null)

        const getRandom = computed(() => {
            let num = (Math.random() * 1000).toString()
            return 'input-' + Symbol(num).toString()
        })

        const switchChange = () => {
            console.log(switchDom.value.checked)
        }
        nextTick(() => {
            watch(switchDom, (newV) => {
                console.log(newV)
            }, { deep: true })
        })

        return{
            switchChange,
            switchDom,
            getRandom
        }
    }
})
</script>

<style scoped lang="scss">
.f-switch{
    display: none;
}
label{
    display: inline-block;
    box-sizing: border-box;
    height: 12px;
    width: 36px;
    vertical-align: middle;
    border: 1px solid transparent;
    background-color: #ddd;
    border-radius: 15px;
    cursor: pointer;
    -webkit-transition: all 0.2s;
    transition: all 0.2s;
    position: relative;
    &:hover .control{
        box-shadow: 0 0 0 .5rem rgba(22, 119, 179,.15);
    }
}

.f-switch:checked + label{
    background-color: rgba(22, 119, 179,.75);
}

.control {
    display: block;
    z-index: 999;
    width: 20px;
    height: 20px;
    position: absolute;
    left: -1px;
    top: 50%;
    border-radius: 18px;
    background-color: #1677b3;
    cursor: pointer;
    transition: all 0.2s cubic-bezier(0.78, 0.14, 0.15, 0.86);
    -webkit-transition: all 0.2s cubic-bezier(0.78, 0.14, 0.15, 0.86);
    transform: translateY(-50%);
}

.f-switch:checked + label > .control {
    left: 16px;
}

/*.f-switch + label::after {*/
/*    content: "关";*/
/*    position: absolute;*/
/*    top: 1px;*/
/*    left: 24px;*/
/*    font-size: 12px;*/
/*    color: #fff*/
/*}*/

/*.f-switch:checked+label::after {*/
/*    content: "开";*/
/*    left: 5px;*/
/*}*/
</style>
