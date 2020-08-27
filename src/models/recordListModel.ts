const localStorageKeyName = 'recordList';
const recordListModel = {
  data: [] as RecordItem[],
  clone(data: RecordItem[] | RecordItem) {
    return JSON.parse(JSON.stringify(data));//深拷贝record
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