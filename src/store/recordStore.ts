import clone from '@/lib/clone';

const localStorageKeyName = 'recordList';

const recordStore = {
  recordList: [] as RecordItem[],
  fetchRecords() {
    this.recordList = JSON.parse(window.localStorage.getItem(localStorageKeyName) || '[]') as RecordItem[];
    return this.recordList;
    //强制指定类型后，后面的很多被他赋值的都不用写类型了
  },
  saveRecords() {
    window.localStorage.setItem(localStorageKeyName,
      JSON.stringify(this.recordList));
  },
  createRecord(record: RecordItem) {
    const record2: RecordItem = clone(record);
    //这么做是因为record是个对象，即基本类型和复杂类型的问题
    record2.createAt = new Date().toISOString();//添加一个时间
    this.recordList?.push(record2);  //意思是data不为undefined就push
    //也可以写成 data && data.push（record2）
    recordStore.saveRecords();
  },
};
recordStore.fetchRecords();

// export default recordStore;
//这个已经不需要了，已经用vuex代替了
//但是这个封装的思想过程还是重要的