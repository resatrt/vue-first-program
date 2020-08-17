<template>
    <div>
        {{value}}
        <lable class="notes">

            <span class="name">备注</span>
            <input type="text"
                   v-model="value"
                   placeholder="在这里输入备注">
            <!--            方法二-->
            <!--            v-model 当 用这种方式时可以将这两者替换为 -->
            <!--                 :value="value"-->
            <!--    @input="value=$event.target.value"  这句的意思是将输入值传给value -->


        </lable>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue';
    import {Component, Watch} from 'vue-property-decorator';

    @Component
    export default class Notes extends Vue {
        value = '';
        // 方法一
        //  <input> 添加     @input="onInput
        // onInput(event: KeyboardEvent) {
        //     const input = event.target as HTMLInputElement;
        //     this.value = input.value;
        // }
      @Watch('value')
      onValueChanged(value: string){
        this.$emit('update:value',value)
      }
    }
</script>

<style lang="scss" scoped>
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

</style>