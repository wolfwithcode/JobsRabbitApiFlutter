import { Injectable } from '@nestjs/common';
import {ApolloClient, HttpLink, InMemoryCache} from 'apollo-boost'
import ggl from 'graphql-tag'
import fetch from 'node-fetch';
const axios = require('axios');

const endpointURL = 'https://jobsrabbitstrapidev.herokuapp.com/graphql';
const client = new ApolloClient(
  {
    link: new HttpLink({uri: endpointURL, fetch}),
    cache: new InMemoryCache({addTypename: false})
  }
);

@Injectable()
export class JobsService {
  //   private jobs = ['kitchen hand', 'IT'];
  async createJob(jobInput) {
    console.log('jobInput', jobInput);
    const query = `mutation CreateJob($input: createJobInput){
      createJob(input: $input){
        job{
          id
          title
          employer{
            id
            shopName
          }
        }
      }
    }`;
    const variables = {
      input: {
        data: {
         ...jobInput 
        },
      },
    };
    // console.log("query ", query);
    try {
      const data = JSON.stringify({
        query,
        variables,
      });

      const config = {
        method: 'post',
        url: 'https://jobsrabbitstrapidev.herokuapp.com/graphql',
        headers: {
          'Content-Type': 'application/json',
        },
        data: data,
      };

      const {
        data: {
          data: {
            createJob: { job },
          },
        },
      } = await axios(config);

      // const response = await axios(config);
      // console.log("response ", response);
      return { ...job };
    } catch (error) {
      console.log(error);
    }
  }



  async getManyJobs(start, limit) {
    try {
      const data = JSON.stringify({
        query: `
        # Write your query or mutation here
        query {
            jobs( start: ${start} limit:${limit}  ){
            id
            state
            city
            address
            zipcode
            email
            salary
            email
            phone
            description
            title
            createdAt
            otherImages {
              path
            }
            employer {
              shopName
              location {
                city
                state
                address
                zipCode
              }
            }
            jobCategory {
              type
              title
            }
            subsciptionCategory {
              type
              title
            }
            template {
              type
              title
            }
          }
        }
        
            `,
        variables: {},
      });

      const config = {
        method: 'post',
        url: 'https://jobsrabbitstrapidev.herokuapp.com/graphql',
        headers: {
          'Content-Type': 'application/json',
        },
        data: data,
      };
      const  query = ggl`{
        jobs( start: ${start} limit:${limit}  ){
        id
        state
        city
        address
        zipcode
        email
        salary
        email
        phone
        description
        title
        createdAt
        otherImages {
          path
        }
        employer {
          shopName
          location {
            city
            state
            address
            zipCode
          }
        }
        jobCategory {
          type
          title
        }
        subsciptionCategory {
          type
          title
        }
        template {
          type
          title
        }
      }
    }`;
      const {data: {jobs}} = await client.query({query})
     
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
}
