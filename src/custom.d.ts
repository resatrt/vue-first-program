type RecordItem = {
  tags: string[];
  notes: string;
  type: string;
  amount: number;   //数据类型
  createAt?: Date;   //类（构造函数）  ？的意思是可以没有
}

type Tag = {
  id: string;
  name: string;
}
type TagListModel = {
  data: Tag[];
  fetch: () => Tag[];
  create: (name: string) => 'success' | 'duplicated'; //联合类型，字符串的子类型 ，我只返回数个固定字符串可以这样写
  update: (id: string, name: string) => 'success' | 'not found' | 'duplicated';
  remove: (id: string) => boolean;
  save: () => void;//void表示不返回
}//先将类型定义好

interface Window {
  tagList: Tag[];
  createTag: (name: string) => void;
  removeTag: (id: string) => boolean;
  updateTag: TagListModel['update'];  //意思是我的内容和TagListModel里的update类型一样
  findTag: (id: string) => Tag;
  recordList: RecordItem[];
  createRecord: (record: RecordItem) => void;
}