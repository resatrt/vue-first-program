<template>
    <nav>
        <router-link to="/Money" class="item" active-class="selected">
<!--            router-link 是跳转-->
            <Icons name="money"/>
<!--      读取文件名为money的svg图片      -->
            记账
        </router-link>

        <router-link to="/Labels" class="item" active-class="selected">
            <Icons name="label"/>
            标签
        </router-link>

        <router-link to="/Statistics" class="item" active-class="selected">
            <Icons name="statistics"/>
            统计
        </router-link>
    </nav>
</template>

<script lang="ts">
    export default {
        name: 'Nav'
    };
</script>

<style lang="scss" scoped>
    @import "~@/assets/style/helper.scss";
    nav{
        @extend %outerBox-shadow;
        display: flex;
        flex-direction: row;
        font-size: 12px;
        >.item{
            width: 33.3333%;
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            padding: 6px 0;
            color: inherit;
            .icon{
                height: 32px;
                width: 32px;
            }
        }
        >.item.selected{
            color: $color-highlight;
        }
    }

</style>