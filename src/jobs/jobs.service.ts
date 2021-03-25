import { Injectable } from '@nestjs/common';
const axios = require('axios');

@Injectable()
export class JobsService {
  private jobs = ['kitchen hand', 'IT'];
  async getAllJobs() {
    try {
      const data = JSON.stringify({
        query: `
                  query{
                      applications{
                      id
                      createdAt
                      updatedAt
                      job
                      {
                          id
                          title
                          description
                          phone
                          salary
                          salaryCategory{
                          title
                          }
                      }
                      employee{
                          phone
                          isVerified
                          dealSalary
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
        data: { data: applications },
      } = await axios(config);
      console.log(applications);
      return applications;
    } catch (error) {
      console.log(error);
    }
    
  }
}
