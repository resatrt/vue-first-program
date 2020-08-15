<template>
    <div class="tags">
        <div class="new">
            <button>新增标签</button>
        </div>
        <ul class="current">
            <li>衣</li>
            <li>食</li>
            <li>住</li>
            <li>行</li>
        </ul>
    </div>
</template>

<script lang="ts">
    export default {
        name: "Tags"
    }
</script>

<style lang="scss" scoped>
    .tags {
        font-size: 14px;
        padding: 16px;
        display: flex;
        flex-grow: 1;
        flex-direction: column-reverse;

        > .current {
            display: flex;

            > li {
                $h: 24px;
                background: #D9D9D9;
                padding: 0 16px;
                height: $h;
                line-height: $h; /*确定只有一行的时候才能使用height等于line-height*/
                margin-right: 12px;
                border-radius: ($h/2);
            }
        }

        > .new {
            padding-top: 16px;

            button {
                background: transparent;
                border: none;
                border-bottom: 1px solid;
                color: #999;
                padding: 0 4px;
            }
        }
    }
</style>