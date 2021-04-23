<template>
    <span :class="['f-breadcrumb-item', getTo]" ref="To">
        <slot></slot>
    </span>
    <span class="f-breadcrumb-separator">{{separator.toString()}}</span>
</template>

<script lang="ts">
import { isEmpty } from '/@/utils/utils'
import {
    defineComponent,
    inject,
    PropType,
    computed,
    ref,
    onMounted,
} from 'vue'
import { useRouter } from 'vue-router'
interface toTypes {
    path? : string;
    name?: string;
    query?: any;
    params?: any;
}

export default defineComponent({
    name: 'f-breadcrumb-item',
    props: {
        to: [String, Object],
        replace: Boolean
    },
    setup ({ to, replace }) {
        const To = ref(null)
        const Router: any = useRouter()
        const { separator }: any = inject('breadcrumb')
        const getTo = computed(()=> {
            return to && !isEmpty(to) ? 'f-breadcrumb--to' : ''
        })
        onMounted(() => {
            const toDom = To as any
            toDom.value.addEventListener('click', () => {
                if (!to) {
                    console.warn("[fast-ui]: 'to' attribute is incorrect")
                    return false
                }
                if (typeof to === 'object') {
                    if (isEmpty(to) && (!(to as toTypes).path || (to as toTypes).name)) {
                        console.warn("[fast-ui]: 'to' attribute is incorrect")
                        return false
                    }
                }
                replace ? Router.replace(to) : Router.push(to)
            })
        })
        return{
            separator,
            getTo,
            To
        }
    }
})
</script>

<style scoped lang="scss">
.f-breadcrumb-item{
    color: #888;
}
.f-breadcrumb-separator{
    display: inline-flex;
    padding: 0 8px;
    align-items: center;
    color: #888;
    &:last-child{
        display: none;
    }
}
.f-breadcrumb--to{
    font-weight: 700;
    color: #333;
    cursor: pointer;
    transition: color .15s;
    &:hover{
        color: #1661ab;
    }
}
</style>
