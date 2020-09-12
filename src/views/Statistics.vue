<template>
  <layout>
    <div class="wrapper">
      <Tabs class-prefix="type" :data-source="recordTypeList" :value.sync="type"/>
      <!--    <Tabs class-prefix="interval" :data-source="intervalList" :value.sync="interval"/>-->

      <div class="echarts-wrapper" ref="chartWrapper">
        <Chart class="echarts" :options="x"/>
      </div>
      <ol v-if="groupList.length>0">
        <li v-for="(group,index) in groupList" :key="index">
          <h3 class="title">{{ beauty(group.title) }}
            <span>￥{{ typeAmount(type) }}{{ group.total }}</span>
          </h3>
          <ol>
            <li v-for="item in group.items" :key="item.id"
                class="record">
              <span class="tag">{{ tagString(item.tags) }}</span>
              <span class="notes">
              {{ item.notes }} </span>
              <span class="money">￥{{ typeAmount(type) }}{{ item.amount }}</span>
            </li>
          </ol>
        </li>
      </ol>
      <div v-else class="noRecord">
        没有查询到相关记录
      </div>
    </div>
  </layout>
</template>

<script lang="ts">
import Vue from 'vue';

import {Component} from 'vue-property-decorator';
import Tabs from '@/components/Tabs.vue';
import intervalList from '@/constants/intervalList';
import recordTypeList from '@/constants/recordTypeList';
import dayjs from 'dayjs';
import clone from '@/lib/clone';
import Chart from '@/components/Chart.vue';
import _ from 'lodash';

@Component({
  components: {Tabs, Chart}
})
export default class Statistics extends Vue {
  get recordList() {
    //这样写就是为了给recordList一个类型，因为store的类型是any
    return (this.$store.state as RootState).recordList;
  }

  beforeCreate() {
    this.$store.commit('fetchRecords');
  }

  mounted() {
    const div = this.$refs.chartWrapper as HTMLDivElement;
    div.scrollLeft = div.scrollWidth;
    //让图表直接显示在最右边，即最近日期
  }

  get y() {
    const today = dayjs().format('YYYY-MM-DD');
    const result = this.groupList;
    const array = [];
    for (let i = 0; i <= 29; i++) {
      const dateString = dayjs(today).subtract(i, 'day').format('YYYY-MM-DD');
      const found = _.find(result, {title: dateString});
      //lodash需要安装
      array.push({date: dateString, value: found ? found.total : 0});
    }
    array.sort((a, b) => {
      if (a.date > b.date) {
        return 1;
      } else if (a.date === b.date) {
        return 0;
      } else {
        return -1;
      }
    });
    return array;
  }

  get x() {

    const keys = this.y.map(item => item.date);
    const values = this.y.map(item => item.value);
    return {
      grid: {
        left: 0,
        right: 0,
      },
      xAxis: {
        type: 'category',
        data: keys,
        axisTick: {alignWithLabel: true},
        axisLine: {lineStyle: {color: '#666'}},
        axisLabel:{formatter: function (value) {
            return value.substr(5)
          }}

      },
      yAxis: {
        type: 'value',
        show: false,

      },
      series: [{
        data: values,
        type: 'line',
        symbol: 'circle',
        symbolSize: 13,
        itemStyle: {color: '#666', borderColor: '#666'},
      }],
      tooltip: {
        show: true, triggerOn: 'click',
        position: 'top',
        formatter: '{c}'
      }
    };
  }

  tagString(tags: Tag[]) {
    const tag = tags.map(item => item.name);
    return tags.length === 0 ? '无' : tag.join('，');
  }

  get groupList() {
    const {recordList} = this;

    const newList = clone(recordList)
        .filter(a => a.type === this.type)//分类收入还是支出
        .sort(((a, b) => dayjs(b.createAt).valueOf() - dayjs(a.createAt).valueOf()));

    if (newList.length === 0) {return [] as Result;}
    //因为filter有可能导致newList的值为空，会导致后面的bug
    type Result = { title: string; total?: number; items: RecordItem[] }[]

    const result: Result = [{title: dayjs(newList[0].createAt).format('YYYY-MM-DD'), items: [newList[0]]}];
    //result={{title:年月日，item:RecordItem[]}}
    for (let i = 1; i < newList.length; i++) {
      const current = newList[i];
      const last = result[result.length - 1];
      if (dayjs(last.title).isSame(dayjs(current.createAt), 'day')) {
        last.items.push(current);
      } else {
        result.push({title: dayjs(current.createAt).format('YYYY-MM-DD'), items: [current]});
      }
    }

    result.forEach(group => {
      group.total = group.items.reduce((sum, index) => sum + index.amount, 0);
    });

    return result;
  }

  typeAmount(type: string) {
    if (type === '-') {
      return type;
    } else {
      return;
    }
  }

  beauty(sting: string) {
    const now = dayjs();
    const day = dayjs(sting);
    if (day.isSame(now, 'day')) {
      return '今天';
    } else if (day.isSame(now.subtract(1, 'day'), 'day')) {
      return '昨天';
    } else if (day.isSame(now.subtract(2, 'day'), 'day')) {
      return '前天';
    } else if (day.isSame(now, 'year')) {
      return day.format('M月D日');
    } else {
      return day.format('YYYY年M月D日');
    }
  }


  type = '-';
  interval = 'day'; //间隔
  intervalList = intervalList;
  recordTypeList = recordTypeList;
}
</script>

<style scoped lang="scss">
.wrapper {
  max-height: 90%;
  overflow: scroll;
}

.echarts {
  width: 420%;

  &-wrapper {
    overflow: auto;

    &::-webkit-scrollbar {
      display: none; /* Safari and Chrome */
    }
  }
}

.noRecord {
  padding: 30px;
  text-align: center;
  font-size: 20px;
}

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

.tag {
  min-width: 60px;
}

.notes {
  margin: 0 auto 0 16px;
  overflow-wrap: normal;
  max-width: 300px;
  color: #999;
}

</style>