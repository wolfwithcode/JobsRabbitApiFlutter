import { Injectable } from '@nestjs/common';
const axios = require('axios');

@Injectable()
export class JobsService {
  private jobs = ['kitchen hand', 'IT'];
  async getAllJobs() {
    try {
      const data = JSON.stringify({
        query: `
        # Write your query or mutation here
        query {
          jobs {
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

      const {
        data: { data: jobs },
      } = await axios(config);
      console.log(jobs);
      return jobs;
    } catch (error) {
      console.log(error);
    }
    
  }
}
