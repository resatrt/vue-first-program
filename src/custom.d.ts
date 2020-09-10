type RecordItem = {
  tags: Tag[];
  notes: string;
  type: string;
  amount: number;   //数据类型
  createAt?: string;   //类（构造函数）  ？的意思是可以没有
}
type RootState = {
  recordList: RecordItem[];
  tagList: Tag[];
  currentTag?: Tag;
  createRecordError: Error | null;
  selectedTags: Tag[];
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

// interface Window {
// }