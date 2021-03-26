import { Injectable } from '@nestjs/common';
import { ApolloClient, HttpLink, InMemoryCache } from 'apollo-boost';
import gql from 'graphql-tag';
import fetch from 'node-fetch';
import algoliasearch from 'algoliasearch';
const ApplicationID = 'NRJXAFBP4P';
const AdminApiKey = '3c83a143e5fec8411fcb0b48cede9323';
const clientAlgoliaSearch = algoliasearch(ApplicationID, AdminApiKey);

const index = clientAlgoliaSearch.initIndex('jobs');

const axios = require('axios');

const endpointURL = 'https://jobsrabbitstrapidev.herokuapp.com/graphql';
const client = new ApolloClient({
  link: new HttpLink({ uri: endpointURL, fetch }),
  cache: new InMemoryCache({ addTypename: false }),
});

const jobDetailFragment = gql`
  fragment JobDetail on Job {
    id
    state
    city
    address
    zipcode
    email
    salary
    phone
    description
    title
    createdAt
    otherImages {
      path
    }
    employer {
      id
      shopName
      location {
        zipCode
        city
        state
        address
      }
    }
    jobCategory {
      id
      type
      title
    }
    subsciptionCategory {
      id
      type
      title
    }
    template {
      id
      type
      title
    }
  }
`;

const createSimpleEmployer = (employer) => {
  const { id, shopName } = employer;
  return { id, shopName };
};
const createSimpRecord = (record) => {
  const { id, title, type } = record;
  return { id, title, type };
};

@Injectable()
export class JobsService {
  //   private jobs = ['kitchen hand', 'IT'];
  async createJob(jobInput) {
    console.log('jobInput', jobInput);
    const mutation = gql`
      mutation CreateJob($input: createJobInput) {
        createJob(input: $input) {
          job {
            ...JobDetail
          }
        }
      }
      ${jobDetailFragment}
    `;
    const variables = {
      input: {
        data: {
          ...jobInput,
        },
      },
    };
    // console.log("query ", query);
    try {
      const {
        data: {
          createJob: { job },
        },
      } = await client.mutate({
        mutation,
        variables,
        update: (cache, mutationResult) => {
          console.log('mutationResult', mutationResult);
        },
      });
      console.log('response ', job);
      return job;
    } catch (error) {
      console.log(error);
    }
  }

  async getManyJobs(start, limit) {
    try {
      const query = gql`{
        jobs( start: ${start} limit:${limit}){
          ...JobDetail
      }
      
    }
    ${jobDetailFragment}
    `;
      const {
        data: { jobs },
      } = await client.query({ query });

      console.log(jobs);
      const { data: count } = await axios.get(
        'https://jobsrabbitstrapidev.herokuapp.com/jobs/count',
      );
      console.log(count);
      return { count, jobs };
    } catch (error) {
      console.log(error);
    }
  }

  async getJobById(id: string) {
    try {
      console.log('id', id);
      const query = gql`
        query JobQuery($id: ID!) {
          job(id: $id) {
            ...JobDetail
          }
        }
        ${jobDetailFragment}
      `;
      const variables = {
        id,
      };

      const {
        data: { job },
      } = await client.query({ query, variables });

      console.log(job);
      return job;
    } catch (error) {}
  }

  async updateJob(id: string, body) {
    try {
      console.log('id', id);
      const mutation = gql`
        mutation UpdateSingleJob($id: ID!, $input: editJobInput) {
          updateJob(input: { where: { id: $id }, data: $input }) {
            job {
              ...JobDetail
            }
          }
        }
        ${jobDetailFragment}
      `;
      const variables = {
        id,
        input: body,
      };

      const {
        data: {
          updateJob: { job },
        },
      } = await client.mutate({
        mutation,
        variables,
        update: (cache, mutationResult) => {
          console.log('mutationResult', mutationResult);
        },
      });

      console.log(job);
      return job;
    } catch (error) {}
  }

  async searchJobs(keyword: string) {
    try {
      const { hits } = await index.search(keyword, {
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
        hitsPerPage: 30,
      });
      const jobs = hits.map((hit) => {
        // console.log('hit', hit);
        const obj = JSON.parse(JSON.stringify(hit) );
        // const { state, title, city } = obj;

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
        } = obj;

        return {
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
          subsciptionCategory: createSimpRecord(
            subsciptionCategory
          ),
          template: createSimpRecord(template),
        };

      });


      return {count: jobs.length, jobs }
    } catch (error) {
      console.log('error ', error);
    }
  }
}
