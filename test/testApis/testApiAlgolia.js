// For the default version
const algoliasearch = require('algoliasearch');

// For the default version
// import algoliasearch from 'algoliasearch';

// For the search only version
// import algoliasearch from 'algoliasearch/lite';

// const client = algoliasearch('01W4A1VB0N', '22ae5e2d7003da68a18557b80123c9bf');

const ApplicationID = 'NRJXAFBP4P';
const AdminApiKey = '3c83a143e5fec8411fcb0b48cede9323';
const client = algoliasearch(ApplicationID, AdminApiKey);

const index = client.initIndex('jobs');
// index.setSettings({
//   attributesForFaceting: [
//     'zipcode' // or 'filterOnly(brand)' for filtering purposes only
//   ]
// })
// index.clearObjects();

// const jobsJSON = require('../input/jobs.json');

// console.log('jobsJSON length', jobsJSON.length);
// console.log('jobsJSON ', jobsJSON);

// index.saveObjects(jobsJSON, {
//   autoGenerateObjectIDIfNotExist: true
// }).then(({ objectIDs }) => {
//   console.log(objectIDs);
// });

// index.replaceAllObjects(jobsJSON, { safe: true , autoGenerateObjectIDIfNotExist: true}).then(({ objectIDs }) => {
// //   console.log(objectIDs);
// }).catch(err => {
//   console.log('err ', err);
// });

// console.log('jobsJSON length', jobsJSON.length);
// console.log('jobsJSON ', jobsJSON);
const body = {
  state: 'Virginia',
  title: 'anhld create new job',
  city: 'Ho Chi Minh',
  address: '6959 S.W. Multnomah Blvd. near S.W. 69th',
  zipcode: 97211,
  email: 'anhld@gmail.com',
  salary: 0,
  phone: 971392821,
  description:
    "We are hiring one or two Line Cooks at The Old Market Pub & Brewery in Southwest Portland.\n( We will also be looking for a Dishwasher soon if you know somebody ! ).\n\nWE'RE 5 MINUTES FROM MULTNOMAH VILLAGE, WASHINGTON SQUARE, RALEIGH HILLS & HILLSDALE, or 10 MINUTES FROM DOWNTOWN PORTLAND.\n\nApplicants are welcome to apply any of three ways:\n\n1) In person, after 9am any day: Come in for an application and an interview on-the-spot.\n\n2) Call or text Andy: 503-209-1017 (my cell, please don't call the restaurant as they may be busy)\n\n3) ( FAIR WARNING: MY SLOWEST RESPONSE IS EMAIL! )\nHow To Email: Use the Craigslist link in the contacts section of this ad\n\nWe have been brewing great beer and serving great food for for over 25 years! This is a great place with a solid, friendly staff.",
  employer: '604632251fcc3454d0829517',
  jobCategory: '6038c4360626cc335a6ff2a6',
  subsciptionCategory: '6038c64d09662c34b493313f',
  template: '604d73a449663a2f9faf7fcd',
};

const createSimpleEmployer = (employer) => {
  const { id, shopName } = employer;
  return { id, shopName };
};
const createSimpRecord = (record) => {
  const { id, title, type } = record;
  return { id, title, type };
};
const filters = '';
// const filters = 'zipcode:90156';
const keyword = "";
// const keyword = " nail";
const start = 1;
const limit = 5;
index
  .search(keyword, {
    filters,
    attributesToRetrieve: [
      'state',
      'title',
      'city',
      'address',
      'zipcode',
      'email',
      'salary',
      'phone',
      'description',
      'employer',
      'jobCategory',
      'subsciptionCategory',
      'template',
    ],
    hitsPerPage: 50,
  })
  .then(({ hits }) => {
    console.log(hits.length);
    const shortHits = hits.slice(start, start+limit);
    console.log("shortHits length", shortHits.length);
    // console.log("shortHits ", shortHits);

    shortHits.map((hit) => {
      const {
        state,
        title,
        city,
        address,
        zipcode,
        email,
        salary,
        phone,
        employer,
        description,
        jobCategory,
        subsciptionCategory,
        template,
      } = hit;

      const simpleEmployer = createSimpleEmployer(employer);

      console.log({
        state,
        title,
        city,
        address,
        zipcode,
        email,
        salary,
        phone,
        employer: createSimpleEmployer(employer),
        description,
        jobCategory: createSimpRecord(jobCategory),
        subsciptionCategory: createSimpRecord(subsciptionCategory),
        template: createSimpRecord(template),
      });
    });
  });
