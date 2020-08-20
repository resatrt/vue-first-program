<template>
  <Layout class-prefix="layout">
    {{ recordList }}
    <NumberPad :value.sync="record.amount" @submit="saveRecord"/>
    <!--    <Types :value="record.type"  @update:value="onUpdateType"/>-->
    <!--    如果出现 ：x='' @update:x='function' 这种，函数（只是）用来更新数据的，可以去掉后面的@update，直接用修饰符.sync-->
    <Types :value.sync="record.type"/>
    <Notes @update:value="onUpdateNotes"/>
    <Tags :data-source.sync="tags" @update:value="onUpdateTags"/>
  </Layout>
</template>

<script lang="ts">
import Vue from 'vue';
import NumberPad from '@/components/Money/NumberPad.vue';
import Types from '@/components/Money/Types.vue';
import Notes from '@/components/Money/Notes.vue';
import Tags from '@/components/Money/Tags.vue';
import {Component, Watch} from 'vue-property-decorator';

type Record = {
  tags: string[];
  notes: string;
  type: string;
  amount: number;
}

@Component({
  components: {Tags, Notes, Types, NumberPad},
})
export default class Money extends Vue {

  tags = ['衣', '食', '住', '行'];
  recordList: Record[] = JSON.parse(window.localStorage.getItem('recordList')||'[]');
  record: Record = {
    tags: [], notes: '', type: '-', amount: 0
  };

  onUpdateTags(value: string[]) {
    this.record.tags = value;
  }

  onUpdateNotes(value: string) {
    this.record.notes = value;
  }

  saveRecord() {
    const record2 = JSON.parse(JSON.stringify(this.record));//深拷贝record
    //这么做是因为record是个对象，即基本类型和复杂类型的问题
    this.recordList.push(record2);
    console.log(this.recordList);
  }

  @Watch('recordList')
  onRecordListChange() {
    window.localStorage.setItem('recordList', JSON.stringify(this.recordList));
  }

  // onUpdateType(value: string) {
  //   this.record.type=value
  // }

  // onUpdateNumber(value: string) {
  //   this.record.amount=parseFloat(value)
  // }
}
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