<template>
    <Layout class-prefix="layout">
        <div class="tags">
            <ul class="current">
                <li>衣</li>
                <li>食</li>
                <li>住</li>
                <li>行</li>
            </ul>
            <div class="new">
                <button>新增标签</button>
            </div>
        </div>
        <div>
            <lable class="notes">
                <span class="name">备注</span>
                <input type="text" placeholder="在这里输入备注">
            </lable>
        </div>
        <div>
            <ul class="types">
                <li class="selected">支出</li>
                <li>收入</li>
            </ul>
        </div>
        <div class="numberPad">
            <div class="output">100</div>
            <div class="buttons">
                <button>1</button>
                <button>2</button>
                <button>3</button>
                <button>删除</button>
                <button>4</button>
                <button>5</button>
                <button>6</button>
                <button>清空</button>
                <button>7</button>
                <button>8</button>
                <button>9</button>
                <button class="ok">OK</button>
                <button class="zero">0</button>
                <button>.</button>
            </div>
        </div>
    </Layout>
</template>

<script lang="ts">
    export default {
        name: 'Money',
    };
</script>

<style lang="scss">
    .layout-content{
        border: 2px solid blue;
        display: flex;
        flex-direction: column-reverse;

    }

</style>

<style lang="scss" scoped>
    /*scoped的意思是这个组件里写的class可以和别的组件同名，*/
    /*但是不会冲突，Vue会给每个class添加随机数*/
    @import "~@/assets/style/helper.scss";

    .numberPad {
        .output {
            font-size: 36px;
            font-family: Consolas, monospace，space; /*monospace是编程字体*/
            padding: 9px 16px;
            text-align: right;
            @extend %innerBoxshadow;
        }

        .buttons {
            @extend %clearFix;
            > button {
                width: 25%;
                font-size: 18px;
                line-height: 22px;
                height: 64px;
                float: left; /*使用float必须要加clearfix*/
                border: none;
                background: transparent;

                &.ok {
                    height: 64px*2;
                    float: right;
                }

                &.zero {
                    width: 25%*2;
                }

                $bg: #f2f2f2;

                &:nth-child(1) {
                    background: $bg;
                }

                &:nth-child(2), &:nth-child(5) {
                    background: darken($bg, 4%);
                }

                &:nth-child(3), &:nth-child(6), &:nth-child(9) {
                    background: darken($bg, 4%*2);
                }

                &:nth-child(4), &:nth-child(7), &:nth-child(10) {
                    background: darken($bg, 4%*3);
                }

                &:nth-child(8), &:nth-child(11), &:nth-child(13) {
                    background: darken($bg, 4%*4);
                }

                &:nth-child(14) {
                    background: darken($bg, 4%*5);
                }

                &:nth-child(12) {
                    background: darken($bg, 4%*6);
                }
            }

        }
    }

    .types {
        background: #c4c4c4;
        display: flex;
        text-align: center;
        font-size: 24px;

        > li {
            width: 50%;
            height: 64px;
            display: flex;
            align-items: center;
            justify-content: center;
            position: relative;

            &.selected {
                &:after {
                    content: ''; /*如果直接用border-bottom的话会在显示的时候影响高度，有个变化*/
                    position: absolute; /*用伪元素的绝对定位就没有影响*/
                    bottom: 0;
                    left: 0;
                    width: 100%;
                    height: 4px;
                    background: #333;

                }

            }
        }

    }

    .notes {
        background: #f5f5f5;
        display: flex;
        font-size: 14px;
        padding-left: 16px;
        align-items: center;

        > .name {
            padding-right: 16px;
        }

        > input {
            flex-grow: 1;
            height: 64px;
            background: transparent;
            padding-right: 16px;
            border: none;
        }
    }

    .tags {
        font-size: 14px;
        padding: 16px;

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