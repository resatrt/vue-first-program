<template>
    <Layout class-prefix="layout">
        <NumberPad/>
        <Types :xxx="333"/>
        <Notes/>
        <Tags/>
    </Layout>
</template>

<script lang="ts">
    import NumberPad from '@/components/Money/NumberPad.vue';
    import Types from '@/components/Money/Types.vue';
    import Notes from '@/components/Money/Notes.vue';
    import Tags from '@/components/Money/Tags.vue';

    export default {
        name: 'Money',
        components: {Tags, Notes, Types, NumberPad},
    };
</script>

<style lang="scss">
    .layout-content {
        display: flex;
        flex-direction: column-reverse;
        /*   column-reverse就是从下往上排列 ，想要保持原来的结构就需要将HTML倒过来    */
    }

</style>

<style lang="scss" scoped>
    /*scoped的意思是这个组件里写的class可以和别的组件同名，*/
    /*但是不会冲突，Vue会给每个class添加随机数*/


</style>