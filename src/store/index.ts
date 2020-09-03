import Vue from 'vue';
import Vuex from 'vuex';
import clone from '@/lib/clone';
import createID from '@/lib/createID';

Vue.use(Vuex);
const localStorageKeyName = 'recordList';
type rootState = {
  recordList: RecordItem[];
  tagList: Tag[];
  currentTag?: Tag;
}
export default new Vuex.Store({
  state: {
    recordList: [],
    tagList: [],
    currentTag: undefined
  } as rootState,
  mutations: {
    //record
    fetchRecords(state) {
      state.recordList = JSON.parse(window.localStorage.getItem(localStorageKeyName) || '[]');
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
    //tag
    fetchTags(state) {
      state.tagList = JSON.parse(window.localStorage.getItem(localStorageKeyName) || '[]');
    },
    setCurrentTag(state, id: string) {
      state.currentTag=state.tagList.filter(t => t.id === id)[0]
    },
    createTag(state, name: string) {
      const names = state.tagList.map(item => item.name);
      if (names.indexOf(name) >= 0) {
        window.alert('标签名重复');
      }
      const id = createID().toString();
      state.tagList.push({id, name: name});
      // store.commit('saveTags')
      window.localStorage.setItem(localStorageKeyName, JSON.stringify(state.tagList));

    },
    saveTags(state) {
      window.localStorage.setItem(localStorageKeyName, JSON.stringify(state.tagList));
    }
  },
});
