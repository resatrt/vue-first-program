<template>
    <div class="nav-wrapper">
        <div class="content">
            Money.vue
        </div>
        <Nav/>
    </div>
</template>

<script lang="ts">

    export default {
        name: 'Money',
    };
</script>

<style lang="scss" scoped>
    .nav-wrapper {
        border: 1px solid green;
        display: flex;
        flex-direction: column;
        height: 100vh;
    }
    .content{
        flex-grow: 1;
        border:1px solid red;
        overflow: auto;//让超过屏幕的内容可滚动，不影响底部导航栏
    }
</style>