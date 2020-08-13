<template>
    <div class="nav-wrapper">
        <div class="content">
            <slot/>
            <!--            slot是把这个位置传进来的东西放到这里显示-->
        </div>
        <Nav/>
    </div>
</template>

<script lang="ts">
    export default {
        name: 'Layout'
    };
</script>

<style scoped>
    .nav-wrapper {
        border: 1px solid green;
        display: flex;
        flex-direction: column;
        height: 100vh;
    }

    .content {
        flex-grow: 1;
        border: 1px solid red;
        overflow: auto; /*让超过屏幕的内容可滚动，不影响底部导航栏*/
    }
</style>