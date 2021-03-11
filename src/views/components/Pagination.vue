<template>
    <ul
        :class="{
            'f-pagination': true,
            ['f-pagination__'+ size]: size !== 'default',
            'f-pagination__circle': circle,
            'f-pagination__disabled': disabled
        }"
        :style="`justify-content: ${placement}`"
    >
        <li
            :class="{
                'f-pagination-pre': true,
                'f-pagination__disabled': currentPage === 1
            }"
            @click="pre"
        >
            <i class="f-icon-arrow-left-bold" style="font-size: 20px"></i>
        </li>
        <li
            v-for="num in getAllPage"
            :key="num"
            :class="{
                'f-pagination-is-active': currentPage === num
            }"
            @click.stop="handleChange('page', num)"
        >{{num}}</li>
        <li
            :class="{
                'f-pagination-next': true,
                'f-pagination__disabled': currentPage === getAllPage
            }"
            @click="next"
        >
            <i class="f-icon-arrow-right-bold" style="font-size: 20px"></i>
        </li>
    </ul>
</template>

<script lang="ts">
import {
    defineComponent,
    reactive,
    toRefs,
    onMounted,
    computed
} from 'vue'

export default defineComponent({
    emits: ['change'],
    props: {
        total: {
            type: Number,
            default: 170
        },
        pageSize: {
            type: Number,
            default: 10
        },
        page: {
            type: Number,
            default: 1
        },
        placement: {
            type: String,
            default: 'center',
            validator: (value: string) => ['flex-start', 'flex-end', 'center'].includes(value)
        },
        limit: {
            type: Number,
            default: 6
        },
        disabled: Boolean,
        showTotal: Boolean,
        circle: Boolean,
        size: {
            type: String,
            default: 'default',
            validator: (value: string) => ['small', 'default', 'large'].includes(value)
        }
    },
    setup (props, { emit }) {
        const data = reactive({
            currentPage: props.page,
            currentSize: props.pageSize
        })

        const getAllPage = computed(() => {
            if (!props.total) return 1
            // 向上取整
            return Math.ceil(props.total / props.pageSize)
        })

        const handleChange = (type: 'page' | 'pageSize', val: number) => {
            if (props.disabled) return
            if (type === 'page') data.currentPage = val
            else data.currentSize = val
            emit('change', type, val)
        }

        const pre = () => {
            if (data.currentPage === 1 || props.disabled) return
            data.currentPage --
            handleChange('page', data.currentPage)
        }

        const next = () => {
            if (data.currentPage === getAllPage.value || props.disabled) return
            data.currentPage ++
            handleChange('page', data.currentPage)
        }

        return{
            open,
            getAllPage,
            handleChange,
            pre,
            next,
            ...toRefs(data)
        }
    }
})
</script>

<style scoped lang="scss">
.f-pagination{
    list-style: none;
    position: relative;
    display: flex;
    align-items: center;
    padding: 10px 0;
    margin: 0;
    box-sizing: border-box;
    font-size: 18px;
    li + li{
        margin-left: calc(.65em);
    }
    li{
        box-sizing: border-box;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        height: calc(2em);
        min-width: calc(2em);
        border-radius: calc(.35em);
        background-color: #fff;
        box-shadow: 0 1px 3px #888;
        cursor: pointer;
        font-size: calc(1em);
        color: #333;
        user-select: none;
        transition: all .15s;
        &:not(:first-child):not(:last-child):not(.f-pagination-is-active):hover{
            transition: all .05s;
            box-shadow: 0 0 0 .12em #1661ab33;
            color: var(--primary);
        }
    }
    li.f-pagination-pre{
        padding-right: calc(.25em);
    }
    li.f-pagination-next{
        padding-left: calc(.25em);
    }
    li.f-pagination-is-active{
        background-color: var(--primary);
        color: #fff;
        box-shadow: 0 0 0 .15em #1661ab33;
    }
}
.f-pagination__small{
    font-size: 16px!important;
}
.f-pagination__large{
    font-size: 20px!important;
}
.f-pagination__disabled{
    color: #999;
    pointer-events: none;
    opacity: .45;
}

.f-pagination__circle{
   li{
       border-radius: 50% !important;
   }
}

</style>
