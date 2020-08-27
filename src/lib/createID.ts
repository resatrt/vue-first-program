// import tagListModel from '@/models/tagListModel';
let id= parseInt( window.localStorage.getItem('_idMax')||'0')||0;
// tagListModel.fetch();
// let ids = tagListModel.data.map(item => parseInt(item.id));


function createID() {
  id++;
  window.localStorage.setItem('_idMax',id.toString())
  return id;
}

export default createID;