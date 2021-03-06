import Vue from 'vue';
import Vuex from 'vuex';
import clone from '@/lib/clone';
import createID from '@/lib/createID';
import router from '@/router';
import dayjs from 'dayjs';


Vue.use(Vuex);
const store = new Vuex.Store({
  state: {
    recordList: [],
    tagList: [],
    currentTag: undefined,
    createRecordError: null,
    selectedTags: []
  } as RootState,
  mutations: {
    //record
    fetchRecords(state) {
      state.recordList = JSON.parse(window.localStorage.getItem('recordList') || '[]');
    },
    // createRecord(state, record) {
    //  const record2: RecordItem = clone(record);
    //       record2.createAt = record2.createAt || new Date().toISOString();//添加一个时间
    //       state.recordList.push(record2);
    //   store.commit('saveRecords');
    //
    // },
    saveRecords(state, record) {
      const record2: RecordItem = clone(record);
      record2.createAt = record2.createAt || dayjs().format('YYYY-MM-DD');//添加一个时间
      state.recordList.push(record2);
      window.localStorage.setItem('recordList',
        JSON.stringify(state.recordList));
         // store.commit('clearSelectedTags',[])
      state.selectedTags=[]
    },
    // clearSelectedTags(state){
    //   state.selectedTags=[]
    // },
    //tag
    fetchTags(state) {
      state.tagList = JSON.parse(window.localStorage.getItem('tagList') || '[]');
      if (!state.tagList || state.tagList.length === 0) {
        store.commit('createTag', '衣');
        store.commit('createTag', '食');
        store.commit('createTag', '住');
        store.commit('createTag', '行');
      }
    },
    setCurrentTag(state, id: string) {
      state.currentTag = state.tagList.filter(t => t.id === id)[0];
    },
    createTag(state, name: string) {
      const names = state.tagList.map(item => item.name);
      if (names.indexOf(name) >= 0) {
        window.alert('标签名重复');
      }
      const id = createID().toString();
      state.tagList.push({id, name: name});
      store.commit('saveTags');

    },
    updateTag(state, payload: { id: string; name: string }) {
      const {id, name} = payload;
      const idList = state.tagList.map(item => item.id);
      if (idList.indexOf(id) >= 0) {
        const names = state.tagList.map(item => item.name);
        if (names.indexOf(name) >= 0) {
          window.alert('标签名重复');
        } else {
          const tag = state.tagList.filter(item => item.id === id)[0];
          tag.name = name;
          store.commit('saveTags');
        }
      }
    },
    removeTag(state, id: string) {
      let index = -1;
      for (let i = 0; i < state.tagList.length; i++) {
        if (state.tagList[i].id === id) {
          index = i;
          break;
        }
      }
      if (index >= 0) {
        state.tagList.splice(index, 1);
        store.commit('saveTags');
        router.back();
      } else {
        window.alert('删除失败');
      }
      if (state.tagList.length === 0) {
        window.alert('最后一个标签了，删除了会重新创建4个原始标签');
      }

    },
    saveTags(state) {
      window.localStorage.setItem('tagList', JSON.stringify(state.tagList));
    }
  }
});
export default store;