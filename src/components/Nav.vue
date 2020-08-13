<template>
    <div>
        <router-link to="/Money">
            <Icons name="money"/>
            记账
        </router-link>
        |
        <router-link to="/Lables">
            <Icons name="lable"/>
            标签
        </router-link>
        |
        <router-link to="/Statistics">
            <Icons name="statistics"/>
            统计
        </router-link>
    </div>
</template>

<script lang="ts">
    export default {
        name: 'Nav'
    };
</script>

<style scoped>

</style>