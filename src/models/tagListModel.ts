const localStorageKeyName = 'tagList';
type Tag = {
  id: string;
  name: string;
}
type TagListModel = {
  data: Tag[];
  fetch: () => Tag[];
  create: (name: string) => 'success' | 'duplicated'; //联合类型，字符串的子类型 ，我只返回数个固定字符串可以这样写
  save: () => void;//void表示不返回
}//先将类型定义好
const tagListModel: TagListModel = {
  data: [],
  fetch() {
    this.data = JSON.parse(window.localStorage.getItem(localStorageKeyName) || '[]');
    return this.data;
  },
  create(name) {
    //this.data=[{id:'1',name:'1'}] data数据发生改变了
    const names=this.data.map(item=>item.name)
    if (names.indexOf(name) >= 0) {return 'duplicated';}
    this.data.push({id:name,name:name});
    this.save();
    return 'success';
  },
  save() {
    window.localStorage.setItem(localStorageKeyName, JSON.stringify(this.data));
  }
};
export default tagListModel;