const Fuse = require ('fuse.js')
const  list = require('../input/jobs-bk.json')

// const list = [{
//   "state": "California",
//   "title": "Line Cook/Prep Cook",
//   "city": "Los Angeles",
//   "address": "5303 Lankershim Blvd near Weddington",
//   "zipcode": "97258",
//   "email": "email_test@gmail.com",
//   "salary": "0",
//   "phone": "971392821",
//   "employer": {
//     "id": "604632251fcc3454d0829517",
//     "shopName": "Luxury Nail"
//   },
//   "description": "We are Hiring!\n\nThe Federal Bar in NOHO is seeking a dedicated, full-time line cook.\nMust be able to commit to 1 year of employment with us.\nHave a fun & energetic attitude.\nWillingness to learn, give feedback & take feedback.\nMulti-tasking is a must as our kitchen is constantly moving.\nFlexible in work schedule, able to work days or nights.\nClean, neat & organized chef skills.\nCOVID health & safety understanding, ServSafe certification or Food Handlers card.\nKnowledge of full kitchen operations – Sauté/Grill/Fry\nNOT AFRAID TO SWEAT & RIDE THE GRIND!!\n\nIf this sounds like you?\nEmail Executive Chef Stefhanie Meyers\nPlease include a resumé along with a proper contact number",
//   "jobCategory": {
//     "id": "6038c4610626cc335a6ff2a7",
//     "title": "full time",
//     "type": "FULL_TIME"
//   },
//   "subsciptionCategory": {
//     "id": "6038c64d09662c34b493313f",
//     "title": "free",
//     "type": "FREE"
//   },
//   "template": {
//     "id": "6038c68509662c34b4933141",
//     "title": "free",
//     "type": "FREE"
//   }
// }];
console.log("list lenght", list.length)

const options = {
  includeScore: true,
  // equivalent to `keys: [['author', 'tags', 'value']]`
  keys: ['description', 'title'],
  
}

const fuse = new Fuse(list, options)

const result = fuse.search('THỰC PHẨM');
const shortResult = result.slice(0, 10);

// console.log("result ", result)
console.log("shortResult ", shortResult)