function clone<T>(data: T): T {
  return JSON.parse(JSON.stringify(data));
}
//<T>是声明， （data：T）是传入的是T类型  ：T是传出的类型
//意思就是 我穿入的是什么类型，传出的也是什么类型
export default clone;