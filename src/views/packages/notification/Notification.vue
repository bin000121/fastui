<template>
    <div class="f-notification">
        <div class="bar"></div>
        <div class="f-notification-container">

        </div>
    </div>
</template>

<script lang="ts">
import {
        defineComponent
} from 'vue'

export default defineComponent({
    setup() {

    }
})
</script>

<style scoped lang="scss">
.f-notification{
    display: flex;
    align-items: center;
    width: 345px;
    border-radius: 5px;
    .bar{
        width: 5px;
    }
}
.f-notification-container{
    word-break: break-word;
}
</style>