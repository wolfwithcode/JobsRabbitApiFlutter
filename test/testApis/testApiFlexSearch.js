var FlexSearch = require("flexsearch");

const docs = require('../input/jobs.json')
// var docs = [{
//   id: 0,
//   title: "Title",
//   cat: "Category",
//   content: "Body"
// },{
//   id: 1,
//   title: "Title",
//   cat: "Category",
//   content: "Body"
// }];


var index = new FlexSearch({
  doc: {
      id: "id",
      field: [
          "title",
          "description",
      ]
  }
});


index.add(docs);

var results = index.search("bánh mỳ", 3);
console.log("results ", results)