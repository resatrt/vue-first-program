const localStorageKeyName = 'recordList';
const recordListModel = {
    clone(data: RecordItem[] | RecordItem) {
        return JSON.parse(JSON.stringify(data));//深拷贝record
    },
    fetch() {
        return JSON.parse(window.localStorage.getItem(localStorageKeyName) || '[]') as RecordItem[];
        //强制指定类型后，后面的很多被他赋值的都不用写类型了
    },
    save(data: RecordItem[]) {
        window.localStorage.setItem(localStorageKeyName, JSON.stringify(data));
    }
};
export default recordListModel;