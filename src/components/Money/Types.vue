<template>
  <div>
    <ul class="types">
      <li :class="{selected:value==='-',[classPrefix+'-item']:classPrefix}"
          @click="selectType('-')">支出
      </li>
      <!--  :class="{selected:value==='-'}"这种是表驱动写法    -->
      <li :class="{selected:value==='+',[classPrefix+'-item']:classPrefix}"
          @click="selectType('+')">收入
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component, Prop} from 'vue-property-decorator';

@Component //这个component是个装饰器,把type：'-'放到data，selectType函数放到methods里
export default class Types extends Vue {
  @Prop(String) readonly value!: string; //！是不要管我的初始值的意思
  @Prop(String) classPrefix?: string;
  //Prop是告诉 Vue xxx不是data是prop
  //Number是告诉Vue xxx运行时是个Number
  //xxx 是属性名
  //number| undefined 是告诉TS xxx的编译时的类型
  //尽量保证Number和number|undefined的类型一致
  // type = '-';//'-'表示支出,'+'表示收入
  selectType(type: string) {
    if (type !== '-' && type !== '+') {
      throw new Error('type is unknown');
    }
    // this.type = type;
    this.$emit('update:value', type);//当type的值发生变化时会触发update事件，值就是type，与父组件Money关联
  }
}
// @Watch('type')
// onTypeChanged(value: string){
//        this.$emit('update:value',value)
// }
//      mounted() {
//          if (this.xxx === undefined) {
//              // console.log('undefined');
//          } else {
//              // console.log(this.xxx.toString());
//              // console.log(typeof this.xxx.toString());
//          }
//      }
//  }
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