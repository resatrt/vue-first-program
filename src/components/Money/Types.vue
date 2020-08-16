<template>
    <div>
        <ul class="types">
            <li :class="type==='-'&&'selected'"
                @click="selectType('-')">支出
            </li>
            <li :class="type==='+'&&'selected'"
                @click="selectType('+')">收入
            </li>
        </ul>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue';
    import {Component} from 'vue-property-decorator';

    @Component //这个componenet是个装饰器,把type：'-'放到data，selectType函数放到methods里
    export default class Types extends Vue {
        type= '-';//'-'表示支出,'+'表示收入
        selectType(type: string) {
            if (type !== '-' && type !== '+') {
                throw new Error('type is unknown');
            }
            this.type = type;
        }
    }
    // export default {
    //     name: "Types",
    //     props:['xxx'],
    //     data() {
    //         return {
    //             type: '-'//'-'表示支出,'+'表示收入
    //         }
    //     },
    //     mounted(){
    //         console.log(this.xxx)
    //     },
    //     methods: {
    //         selectType(type) {
    //             if (type !== '-' && type !== "+") {
    //                 throw new Error('type is unknown')
    //             }
    //             this.type = type
    //         }
    //     }
    // }
</script>

<style lang="scss" scoped>
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

</style>