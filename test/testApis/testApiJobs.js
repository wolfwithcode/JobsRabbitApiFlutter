const axios = require('axios');
const LOCAL_HOST = 'http://localhost:8080';
const REMOTE_HOST = 'https://jobsrabbitstrapicustom.herokuapp.com';
// const HOST = LOCAL_HOST;
const HOST = REMOTE_HOST;
const writeJsonFile = require('write-json-file');

const getJobs = async (start = 0, limit = 100) => {
  try {
    const response = await axios.get(
      `${HOST}/jobs?start=${start}&limit=${limit}`,
    );
    const { data } = response;
    console.log('data', JSON.stringify(data));

    writeJsonFile('test/outputJson/jobs.json', data);
    writeJsonFile(
      `test/outputJson/jobs_${new Date().toISOString()}.json`,
      data,
    );
  } catch (error) {
    console.log('err ', error);
  }
};


const getSingleJob = async (id) => {
  try {
    const response = await axios.get(
      `${HOST}/jobs/${id}`,
    );
    const { data: job } = response;
    console.log('data', JSON.stringify(job));

    writeJsonFile('test/outputJson/singleJob.json', job);
    writeJsonFile(
      `test/outputJson/singleJob_${new Date().toISOString()}.json`,
      job,
    );
  } catch (error) {
    console.log('err ', error);
  }
};




const updateJob = async (id, body) => {
  try {
    const response = await axios.patch(
      `${HOST}/jobs/${id}`,
      body
    );
    const { data: job } = response;
    console.log('data', JSON.stringify(job));

    writeJsonFile('test/outputJson/updateJob.json', job);
    writeJsonFile(
      `test/outputJson/updateJob_${new Date().toISOString()}.json`,
      job,
    );
  } catch (error) {
    console.log('err ', error);
  }
};


const createJob = async (body) => {
  try {
    const response = await axios.post(
      `${HOST}/jobs`,
      body
    );
    const { data: job } = response;
    console.log('data', JSON.stringify(job));

    writeJsonFile('test/outputJson/createJob.json', job);
    writeJsonFile(
      `test/outputJson/createJob_${new Date().toISOString()}.json`,
      job,
    );
  } catch (error) {
    console.log('err ', error);
  }
};

const body = {
  "state": "Virginia",
  "title": "anhld create new job",
  "city": "Ho Chi Minh",
  "address": "6959 S.W. Multnomah Blvd. near S.W. 69th",
  "zipcode": 97211,
  "email": "anhld@gmail.com",
  "salary": 0,
  "phone": 971392821,
  "description": "We are hiring one or two Line Cooks at The Old Market Pub & Brewery in Southwest Portland.\n( We will also be looking for a Dishwasher soon if you know somebody ! ).\n\nWE'RE 5 MINUTES FROM MULTNOMAH VILLAGE, WASHINGTON SQUARE, RALEIGH HILLS & HILLSDALE, or 10 MINUTES FROM DOWNTOWN PORTLAND.\n\nApplicants are welcome to apply any of three ways:\n\n1) In person, after 9am any day: Come in for an application and an interview on-the-spot.\n\n2) Call or text Andy: 503-209-1017 (my cell, please don't call the restaurant as they may be busy)\n\n3) ( FAIR WARNING: MY SLOWEST RESPONSE IS EMAIL! )\nHow To Email: Use the Craigslist link in the contacts section of this ad\n\nWe have been brewing great beer and serving great food for for over 25 years! This is a great place with a solid, friendly staff.",
  "employer": "604632251fcc3454d0829517",
  "jobCategory": "6038c4360626cc335a6ff2a6",
  "subsciptionCategory": "6038c64d09662c34b493313f",
  "template": "604d73a449663a2f9faf7fcd"
}

createJob(body);
// updateJob("604d826095c7d03ae646eba1", body);
// getSingleJob("604d826095c7d03ae646eba1");
// getJobs();
