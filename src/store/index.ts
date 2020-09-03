import Vue from 'vue';
import Vuex from 'vuex';
import clone from '@/lib/clone';

Vue.use(Vuex);
const localStorageKeyName = 'recordList';
export default new Vuex.Store({
  state: {
    recordList: [] as RecordItem[],
  },
  mutations: {
    fetchRecords(state) {
      state.recordList = JSON.parse(window.localStorage.getItem(localStorageKeyName) || '[]');
      //强制指定类型后，后面的很多被他赋值的都不用写类型了
    },
    createRecord(state, record) {
      const record2: RecordItem = clone(record);
      record2.createAt = new Date();//添加一个时间
      state.recordList.push(record2);
      // store.commit('saveRecords'); TODO这个写法没问题，不知道是哪出问题了
      window.localStorage.setItem(localStorageKeyName,
        JSON.stringify(state.recordList));
    },
    saveRecords(state) {
      window.localStorage.setItem(localStorageKeyName,
        JSON.stringify(state.recordList));
    },
  },
});
