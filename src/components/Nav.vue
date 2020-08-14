<template>
    <nav>
        <router-link to="/Money" class="item" active-class="selected">
            <Icons name="money"/>
            记账
        </router-link>

        <router-link to="/Lables" class="item" active-class="selected">
            <Icons name="lable"/>
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
        display: flex;
        box-shadow: 0 0 3px rgb(0 0 0.25);
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