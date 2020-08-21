const localStorageKeyName = 'tagList';
type TagListModel = {
    data: [];
    fetch: () => string[];
    create: (name: string) => 'success'|'duplicated'; //联合类型，字符串的子类型 ，我只返回数个固定字符串可以这样写
    save: () => void;//void表示不返回
}//先将类型定义好
const tagListModel: TagListModel = {
    data: [],
    fetch() {
        this.data = JSON.parse(window.localStorage.getItem(localStorageKeyName) || '[]')
        return this.data
    },
    create(name) {
        if(this.data.indexOf(name)>=0){return 'duplicated'}
        this.data.push(name)
        this.save()
        return 'success'
    },
    save() {
        window.localStorage.setItem(localStorageKeyName, JSON.stringify(this.data));
    }
};
export default tagListModel;