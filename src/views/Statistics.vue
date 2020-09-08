<template>
  <layout>
    <Tabs class-prefix="type" :data-source="recordTypeList" :value.sync="type"/>
    <Tabs class-prefix="interval" :data-source="intervalList" :value.sync="interval"/>
    <ol>
      <li v-for="(group,index) in result" :key="index">
        <h3 class="title">{{ group.title }}</h3>
        <ol>
          <li v-for="item in group.items" :key="item.id"
              class="record">
            <span class="tag">{{ tagString(item.tags) }}</span>
            <span class="notes">
              {{ item.notes }} </span>
            <span class="money">￥{{ item.amount }}</span>
          </li>
        </ol>
      </li>
    </ol>
  </layout>
</template>

<script lang="ts">
import Vue from 'vue';

import {Component} from 'vue-property-decorator';
import Tabs from '@/components/Tabs.vue';
import intervalList from '@/constants/intervalList';
import recordTypeList from '@/constants/recordTypeList';

@Component({
  components: {Tabs}
})
export default class Statistics extends Vue {
  get recordList() {
    //这样写就是为了给recordList一个类型，因为store的类型是any
    return (this.$store.state as RootState).recordList;
  }

  beforeCreate() {
    this.$store.commit('fetchRecords');
  }

  tagString(tags: Tag[]) {
    const temp = [];
    for (let i = 0; i < tags.length; i++) {
      const tag = tags[i].name;
      temp.push(tag);
    }
    return tags.length === 0 ? '无' : temp.join(',');
  }

  get result() {
    type Item = RecordItem[]
    type hashTableValue = { title: string; items: Item }
    const {recordList} = this;
    const hashTable: { [key: string]: hashTableValue } = {};
    for (let i = 0; i < recordList.length; i++) {
      const [date, time] = recordList[i].createAt!.split('T');
      hashTable[date] = hashTable[date] || {title: date, items: []};
      hashTable[date].items.push(recordList[i]);
    }
    return hashTable;
  }

  type = '-';
  interval = 'day'; //间隔
  intervalList = intervalList;
  recordTypeList = recordTypeList;
}
</script>

<style scoped lang="scss">
::v-deep .type-tabs-item {
  background: white;

  &.selected {
    background: #c4c4c4;

    &::after {
      display: none;
    }
  }
}

::v-deep .interval-tabs-item {
  height: 48px;
}

%item {
  padding: 8px 16px;
  line-height: 24px;
  display: flex;
  justify-content: space-between;
  align-content: center;
}

.title {
  @extend %item;
}

.record {
  background: white;
  @extend %item;
}
.tag{
  min-width: 60px;
}
.notes {
  margin: 0 auto 0 16px;
  overflow-wrap: normal;
  max-width: 300px;
  color: #999;
}

</style>