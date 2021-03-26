import { Injectable } from '@nestjs/common';
import { ApolloClient, HttpLink, InMemoryCache } from 'apollo-boost';
import gql from 'graphql-tag';
import fetch from 'node-fetch';
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
}
