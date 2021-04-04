<template>
    <ul
        :class="{
            'f-pagination': true,
            'f-pagination__simple': simple,
            ['f-pagination__'+ size]: size !== 'default',
            'f-pagination__circle': !text && circle,
            'f-pagination__disabled': disabled,
            'f-pagination__text': text,
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
            <i class="f-icon-arrow-left-bold"></i>
        </li>

        <template v-if="simple">
            <li>{{currentPage}}</li>
            <li>/</li>
            <li>{{getAllPage}}</li>
        </template>
        <!--v-if 与 v-for不能一起使用-->
        <template v-else>
            <template v-for="num in getAllPage" :key="num">
                <li
                    :class="{
                    'f-pagination-is-active': currentPage === num
                }"
                        v-show="showNumBtn(num)"
                        @click.stop="handleChange('page', num)"
                >{{num}}</li>
                <li class="f-pagination-ellipsis" v-if="showEllipsisBtn(num)">
                    <span>&hellip;</span>
                    <i
                        :class="getFastIcon(num)[0]"
                        :title="getFastIcon(num)[1]"
                        @click="handleFastStep(getFastIcon(num)[1])"
                    ></i>
                </li>
            </template>
        </template>

        <li
            :class="{
                'f-pagination-next': true,
                'f-pagination__disabled': currentPage === getAllPage
            }"
            @click="next"
        >
            <i class="f-icon-arrow-right-bold"></i>
        </li>

        <li class="f-pagination__total" v-if="showTotal">
            共 {{total}} 条
        </li>

        <li class="f-pagination__size-array" v-if="showSizeArray">
            <f-select
                @change="sizeArrayChange"
                v-model:value="currentSize"
            >
                <f-option
                    v-for="(item, i) in sizeArray"
                    :key="i"
                    :label="item"
                    :value="item"
                    :format-option="formatOption || ((label) => `${label} 条/页`)"
                />
            </f-select>
        </li>

        <li class="f-pagination__elevator" v-if="showElevator">
            跳至
            <input
                type="text"
                :value="currentPage"
                @keydown.enter="e => handleChange('page', e.target.value ? Number(e.target.value) : 1)"
                @blur="e => handleChange('page', e.target.value ? Number(e.target.value) : 1)"
            >
            页
        </li>
    </ul>
</template>

<script lang="ts">
import {
    defineComponent,
    reactive,
    toRefs,
    onMounted,
    computed,
    watchEffect,
    PropType
} from 'vue'
import fSelect from '/@/views/packages/select/Select.vue'
import fOption from '/@/views/packages/select/Select-option.vue'
interface dataType {
    currentPage: number;
    currentSize: number;
    showNum: number[];
    showEllipsis: number[];
}
type orderType = 'pagination' | 'total' | 'elevator' | 'pages'[]

export default defineComponent({
    components: {
        fSelect,
        fOption
    },
    name: 'FPagination',
    inheritAttrs: false,
    emits: ['change'],
    props: {
        total: {
            type: Number,
            default: 0
        },
        pageSize: {
            type: Number,
            default: 10
        },
        sizeArray: {
            type: Array as PropType<number[]>,
            default: [10, 20, 50, 100],
            validator: (val: number[]) => val.length > 0
        },
        formatOption: Function as PropType<(label: string | number) => string>,
        page: {
            type: Number,
            default: 1
        },
        placement: {
            type: String,
            default: 'center',
            validator: (value: string) => ['flex-start', 'flex-end', 'center'].includes(value)
        },
        order: {
           type: Array as PropType<orderType>,
           default: ['pagination', 'total', 'elevator', 'pages']
        },
        limit: {
            type: Number,
            default: 6,
            validator: (num: number) => num >= 6 || num <= 15
        },
        step: {
            type: Number,
            default: 5,
            validator: (num: number) => (num >= 5 || num <= 100)
        },
        disabled: Boolean,
        showTotal: Boolean,
        showElevator: Boolean,
        showSizeArray: Boolean,
        simple: Boolean,
        circle: Boolean,
        text: Boolean,
        // type: {
        //     type: String,
        //     default: 'default',
        //     validator: (val: string) =>  ['default', 'text', 'circle', 'simple'].includes(val)
        // },
        size: {
            type: String,
            default: 'default',
            validator: (value: string) => ['small', 'default', 'large'].includes(value)
        }
    },
    setup (props, { emit }) {

        let limit: number = props.limit
        let fastStep: number = props.step // 快进或快退的步长为5

        watchEffect(() => {
            if (props.limit < 6) limit = 6
            else if (props.limit > 15) limit = 15
            else limit = Math.floor(props.limit)

            if (props.step < 5) fastStep = 5
            else if (props.step > 100) fastStep = 100
            else fastStep = Math.floor(props.step)
        })

        const data: dataType = reactive({
            currentPage: props.page,
            currentSize: props.pageSize,
            showNum: [],
            showEllipsis: []
        })
        const getFastIcon = computed(() => {
            return (num: number) => {
                return num === 2 ? ['f-icon-backward', `向前${fastStep}页`] : ['f-icon-forward', `向后${fastStep}页`]
            }
        })

        const getAllPage = computed(() => {
            if (!props.total || props.total <= props.pageSize) return 1
            // 向上取整
            return Math.ceil(props.total / props.pageSize)
        })

        const showNumBtn = computed(() => {
            return (num: number) => {
                // 为空表示展示全部
                if (!data.showNum.length) return true
                return data.showNum.includes(num)
            }
        })

        const showEllipsisBtn = computed(() => {
            return (num: number) => {
                return data.showEllipsis.includes(num)
            }
        })

        const sizeArrayChange = (data: number) => {
            handleChange('pageSize', data)
        }

        const handleFastStep = (str: string) => {
            if (str.startsWith('向前')) {
                handleChange(
                    'page',
                    data.currentPage - fastStep > 1
                        ? data.currentPage - fastStep
                        : 1)
            } else {
                handleChange(
                    'page',
                    data.currentPage + fastStep > getAllPage.value
                        ? getAllPage.value
                        : data.currentPage + fastStep)
            }
        }

        const updateBtnList = () => {

            data.showNum = []
            data.showEllipsis = []
            // 限制数量大于等于总页码，则全部显示
            if (limit >= getAllPage.value) return
            // 省略号出现在最大页码-1的位置
            if (data.currentPage < limit - 1) {
                for (let i = 1; i<= limit - 1; i++) {
                    data.showNum.push(i)
                }
                data.showNum = [...data.showNum ,getAllPage.value]
                data.showEllipsis = [getAllPage.value - 1]
                return
            }
            // 省略号出现在页码1和页码2之间
            if (data.currentPage >= getAllPage.value - (limit - 2)) {
                for (let i = getAllPage.value - (limit - 2); i<= getAllPage.value; i++) {
                    data.showNum.push(i)
                }
                data.showNum = [1, ...data.showNum]
                data.showEllipsis = [2]
                return
            }

            // 摆出 1...按钮组...最大页码 的排列方式
            if (data.currentPage >= limit - 1) {
                // 中间按钮个数
                const middleLength = limit - 2
                // 找到中位数
                const middleNum = middleLength % 2 === 0 ? middleLength / 2 : (middleLength + 1) / 2
                const limitUp = data.currentPage - (middleNum - 1)
                for (let i = 0; i<= middleLength - 1; i++) {
                    data.showNum.push(i + limitUp)
                }
                data.showNum = [1, ...data.showNum ,getAllPage.value]
                data.showEllipsis = [2, getAllPage.value - 1]
            }
        }

        // 初始化按钮列表排列
        updateBtnList()

        // 处理页码或者一页大小变化
        const handleChange = (type: 'page' | 'pageSize', val: number) => {
            if (props.disabled) return
            // 变化后的页码或分页大小一致就不在执行该函数
            if (type === 'page') data.currentPage = val > getAllPage.value ? getAllPage.value : val
            else data.currentSize = val
            updateBtnList()
            // if (elevatorIptDom) elevatorIptDom.value = data.currentPage
            emit('change', type, val)
        }

        // 向前翻页
        const pre = () => {
            if (data.currentPage === 1 || props.disabled) return
            data.currentPage --
            handleChange('page', data.currentPage)
        }

        // 向后翻页
        const next = () => {
            if (data.currentPage === getAllPage.value || props.disabled) return
            data.currentPage ++
            handleChange('page', data.currentPage)
        }

        return{
            getAllPage,
            handleChange,
            handleFastStep,
            sizeArrayChange,
            pre,
            next,
            showNumBtn,
            showEllipsisBtn,
            getFastIcon,
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
    font-size: 16px;
    & > li{
        margin-left: .75em;
        box-sizing: border-box;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        height: calc(2em);
        min-width: calc(2em);
        border-radius: calc(.35em);
        background-color: #fff;
        box-shadow: 0 1px 3px #666;
        cursor: pointer;
        font-size: calc(1em);
        color: #333;
        user-select: none;
        transition: all .1s;
        &:not(.f-pagination-pre):not(.f-pagination-next):not(.f-pagination__total):not(.f-pagination__elevator):not(.f-pagination__size-array):not(.f-pagination-is-active):hover{
            transition: all .05s;
            box-shadow: 0 0 0 .15em #1661ab33;
            color: var(--primary);
        }
        i{
            font-size: calc(1em);
        }
    }
    li.f-pagination-is-active{
        background-color: var(--primary);
        color: #fff;
        box-shadow: 0 0 0 .18em #1661ab33;
    }
    li.f-pagination-pre{
        padding-right: calc(.12em);
    }
    li.f-pagination-next{
        padding-left: calc(.12em);
    }
    li.f-pagination-ellipsis{
        box-shadow: none;
        &:hover{
            box-shadow: none!important;
            color: var(--primary);
            transform: translateY(calc(-.15em)) scale(1.15);
            span{
                display: none;
            }
            i{
                align-items: flex-end;
                display: block;
            }
        }
        i{
             display: none;
         }
    }
    li.f-pagination__total, li.f-pagination__elevator, li.f-pagination__size-array{
        user-select: text;
        cursor: text;
        box-shadow: none!important;
        font-size: calc(.9em);
    }
}
li.f-pagination__size-array{
    width: 100px;
    :deep {
        .f-select{
            min-height: 32px!important;
            font-size: 14px!important;
        }
        .f-select-input{
            height: 32px;
            line-height: 32px;
        }
        .f-option-list-ul {
            min-width: 120px;
        }
    }
}
li.f-pagination__elevator input{
    display: inline-block;
    box-sizing: border-box;
    margin: 0 5px;
    outline: 0;
    padding: 0 10px;
    border: 1px solid #ccc;
    text-align: center;
    border-radius: calc(.35em);
    width: calc(2em + 20px);
    height: calc(2em);
    cursor: pointer;
    color: #333;
    transition: border-color .15s;
    &:focus{
        border-color: var(--primary);
    }
}
.f-pagination__small{
    font-size: 14px!important;
    .f-pagination__size-array{
        :deep {
            .f-select{
                min-height: 28px!important;
                font-size: 14px!important;
            }
            .f-select-input{
                height: 28px;
                line-height: 28px;
            }
        }
    }
}
.f-pagination__large{
    font-size: 18px!important;
    .f-pagination__size-array{
        width: 120px;
        :deep {
            .f-select{
                min-height: 36px!important;
                font-size: 16px!important;
            }
            .f-select-input{
                height: 36px;
                line-height: 36px;
            }
        }
    }
}
.f-pagination__disabled{
    color: #999;
    pointer-events: none;
    opacity: .45;
}
.f-pagination.f-pagination__text{
    li{
        box-shadow: none!important;
        &:not(.f-pagination-is-active):hover{
            transform: translateY(calc(-.15em)) scale(1.15);
            color: var(--primary);
        }
    }
}
.f-pagination__circle{
   li{
       border-radius: 50% !important;
   }
}
.f-pagination__simple{
   li {
       cursor: default;
       &.f-pagination-pre,&.f-pagination-next{
           cursor: pointer;
       }
       &:hover{
           box-shadow: 0 1px 3px #666!important;
           transform: none!important;
           color: #333!important;
       }
       &.f-pagination__total, &.f-pagination__elevator, &.f-pagination__size-array{
           box-shadow: none!important
       }
       &:nth-child(3){
           box-shadow: none!important;
           color: #333!important;
           transform: scale(1.15) !important;
       }
   }
}
.f-pagination__simple.f-pagination__text{
    li{
        box-shadow: none!important;
    }
}
</style>
