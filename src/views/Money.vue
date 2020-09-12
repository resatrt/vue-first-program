<template>
  <Layout class-prefix="layout">
    <NumberPad :value.sync="record.amount" @submit="saveRecord"/>
    <!--    <Types :value="record.type"  @update:value="onUpdateType"/>-->
    <!--    如果出现 ：x='' @update:x='function' 这种，函数（只是）用来更新数据的，可以去掉后面的@update，直接用修饰符.sync-->
    <!--    <Types :value.sync="record.type"/>-->
    <Tabs :data-source="recordTypeList" :value.sync="record.type"/>
    <div class="formWrapper ">
      <FormItem field-name="日期" :value.sync="record.createAt"
                type="date"/>
    </div>
    <div class="formWrapper note">
      <FormItem field-name="备注" :value.sync="record.notes"
                placeholder="请在这里输入备注"/>
    </div>
    <Tags @update:value="onUpdateTags"/>
    <!--    {{ record }}-->
  </Layout>
</template>

<script lang="ts">
import Vue from 'vue';
import NumberPad from '@/components/Money/NumberPad.vue';
import Tags from '@/components/Money/Tags.vue';
import {Component,} from 'vue-property-decorator';
import FormItem from '@/components/Money/FormItem.vue';
import recordTypeList from '@/constants/recordTypeList';
import Tabs from '@/components/Tabs.vue';
import dayjs from 'dayjs';


@Component({
  components: {Tabs, FormItem, Tags, NumberPad},
})
export default class Money extends Vue {

  record: RecordItem = {tags: [], notes: '', type: '-', amount: 0, createAt: dayjs().format('YYYY-MM-DD')};

  // get recordList() {
  //   return this.$store.state.recordList;
  // }

  recordTypeList = recordTypeList;

  created() {
    this.$store.commit('fetchRecords');
    //一开始就读取recordList

  }

  onUpdateTags(value: Tag[]) {
   this.record.tags = value;
  }

  // onUpdateNotes(value: string) {
  //   this.record.notes = value;
  // }

  saveRecord() {
    if (!this.record.tags || this.record.tags.length === 0) {
      window.alert('请至少选择一个标签');
      this.record.notes = '';
      return;
    } else if (this.record.amount === 0) {
      window.alert('请输入具体金额');
    } else {
      this.$store.commit('saveRecords', this.record);
      //vuex更改数据的操作都是commit（事件名,//要传递数据）
      // console.log(this.$store.state.recordList);

      if (this.$store.state.createRecordError === null) {
        window.alert('保存成功');
        this.record.notes = '';
      }
    }

  }

  // onUpdateType(value: string) {
  //   this.record.type=value
  // }

  // onUpdateNumber(value: string) {
  //   this.record.amount=parseFloat(value)
  // }
}
</script>

<style lang="scss" scoped>
::v-deep .layout-content {
  display: flex;
  flex-direction: column-reverse;

  > .formWrapper {
    background: #f5f5f5;
    padding: 8px 0;
  }

  > .formWrapper.note {
    box-shadow: -1px 1px 10px 2px rgba(196,196,196,1);
  }

  /*   column-reverse就是从下往上排列 ，想要保持原来的结构就需要将HTML倒过来    */
}

</style>

<style lang="scss" scoped>
/*scoped的意思是这个组件里写的class可以和别的组件同名，*/
/*但是不会冲突，Vue会给每个class添加随机数*/


</style>