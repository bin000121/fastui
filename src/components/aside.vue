<template>
    <div class="aside">
        <ul>
            <li v-for="([k, v]) in Object.entries(element)" :key="k">
                <router-link :to="k" active-class="active">{{v}}</router-link>
            </li>
        </ul>
    </div>
</template>

<script lang="ts">
import {
    defineComponent,
    ref,
    reactive
} from 'vue'

export default defineComponent( {
    setup () {
        const element = reactive({
            '/doc/button': 'Button 按钮',
            '/doc/tag': 'Tag 标签',
            '/doc/switch': 'Switch 开关',
            '/doc/box': 'Box 盒子',
            '/doc/grid': 'Grid 栅格'
        })
        return {
            element
        }
    }
})
</script>

<style scoped lang="scss">
ul{
    margin: 0;
    list-style: none;
    li{
        height: 40px;
        line-height: 40px;
    }
    a{
        color: #999;
        transition: color .2s;
        width: 100%;
        height: 100%;
        display: inline-block;
        &:hover{
            color: #58a397;
        }
    }
}
.aside{
    width: 200px;
    min-width: 160px;
    box-sizing: border-box;
    border-right: 1px solid #eee;
    padding: 5px;
    .active{
        color: #58a397;
    }
}
</style>
