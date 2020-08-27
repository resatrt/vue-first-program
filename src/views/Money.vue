<template>
  <Layout class-prefix="layout">
        {{ record }}
    <NumberPad :value.sync="record.amount" @submit="save"/>
    <!--    <Types :value="record.type"  @update:value="onUpdateType"/>-->
    <!--    如果出现 ：x='' @update:x='function' 这种，函数（只是）用来更新数据的，可以去掉后面的@update，直接用修饰符.sync-->
    <Types :value.sync="record.type"/>
    <div class="formWrapper">
      <FormItem field-name="备注" @update:value="onUpdateNotes"
                placeholder="请在这里输入备注"/>
    </div>
    <Tags :data-source.sync="tags" @update:value="onUpdateTags"/>
  </Layout>
</template>

<script lang="ts">
import Vue from 'vue';
import NumberPad from '@/components/Money/NumberPad.vue';
import Types from '@/components/Money/Types.vue';
import Tags from '@/components/Money/Tags.vue';
import {Component, Watch} from 'vue-property-decorator';
import recordListModel from '@/models/recordListModel';
import tagListModel from '@/models/tagListModel';
import FormItem from '@/components/Money/FormItem.vue';


const recordList = recordListModel.fetch();
// JSON.parse(window.localStorage.getItem('recordList') || '[]');

const tagList = tagListModel.fetch();

@Component({
  components: {FormItem, Tags, Types, NumberPad},
})
export default class Money extends Vue {

  tags = tagList; //不写死，从model里读取
  recordList = recordList;
  record: RecordItem = {tags: [], notes: '', type: '-', amount: 0};

  onUpdateTags(value: string[]) {
    this.record.tags = value;
  }

  onUpdateNotes(value: string) {
    this.record.notes = value;
  }

  save() {
    const record2: RecordItem = recordListModel.clone(this.record);
    //这么做是因为record是个对象，即基本类型和复杂类型的问题
    record2.createAt = new Date();//添加一个时间
    this.recordList.push(record2);
  }

  @Watch('recordList')
  onRecordListChange() {
    recordListModel.save(this.recordList);
    // window.localStorage.setItem('recordList', JSON.stringify(this.recordList));
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

  > .formWrapper {
    background: #f5f5f5;
    padding: 12px 0;
  }


  /*   column-reverse就是从下往上排列 ，想要保持原来的结构就需要将HTML倒过来    */
}

</style>

<style lang="scss" scoped>
/*scoped的意思是这个组件里写的class可以和别的组件同名，*/
/*但是不会冲突，Vue会给每个class添加随机数*/


</style>