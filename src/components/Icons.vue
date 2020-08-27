<template>
    <svg class="icon"  @click="$emit('click',$event)">
        <use v-bind:xlink:href="'#'+name"/>
<!--   要传入数据所以要绑定     <use xlink:href="#money"/>-->
    </svg>
</template>

<script lang="ts">
    export default {
        name: 'Icons',
        props: ['name'],
    };
    const improtAll = (requireContext: __WebpackModuleApi.RequireContext) => requireContext.keys().forEach(requireContext);
    try {
        improtAll(require.context('../assets/icons', true, /\.svg$/));
        //获取icons目录里的.svg文件，这个路径只能是相对路径，不能用@
    } catch (error) {
        console.log(error);
    }
    //用try{}catch{}是为了防止在单元测试时过不去
</script>

<style lang="scss" scoped>
    .icon {
        width: 1em;
        height: 1em;
        vertical-align: -0.15em;
        fill: currentColor;
        overflow: hidden;
    }

</style>