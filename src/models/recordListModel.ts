import clone from '@/lib/clone';

const localStorageKeyName = 'recordList';
const recordListModel = {
  data: [] as RecordItem[],
  create(record: RecordItem) {
    const record2: RecordItem = clone(record);
    //这么做是因为record是个对象，即基本类型和复杂类型的问题
    record2.createAt = new Date();//添加一个时间
    this.data.push(record2);
  },
  fetch() {
    this.data = JSON.parse(window.localStorage.getItem(localStorageKeyName) || '[]') as RecordItem[];
    return this.data;
    //强制指定类型后，后面的很多被他赋值的都不用写类型了
  },
  save() {
    window.localStorage.setItem(localStorageKeyName,
       JSON.stringify(this.data));
  }
};
export default recordListModel;