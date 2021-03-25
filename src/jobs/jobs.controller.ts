import { Controller, Get } from '@nestjs/common';
import { JobsService } from './jobs.service';
const fetch = require('node-fetch');
const axios = require('axios');
@Controller('jobs')
export class JobsController {
  constructor(private jobsService: JobsService) {}

  @Get()
  getAllJobs() {
    // fetch('https://jobsrabbitstrapidev.herokuapp.com/graphql', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //       'Accept': 'application/json',
    //     },
    //     body: JSON.stringify({query :`{
    //         applications{
    //           id
    //           createdAt
    //           updatedAt
    //           job
    //           {
    //             id
    //             title
    //             description
    //             phone
    //             salary
    //             salaryCategory{
    //               title
    //             }
    //           }
    //           employee{
    //             phone
    //             isVerified
    //             dealSalary
    //           }
    //         }
    //       }`})
    //   })
    //     .then(r => r.json())
    //     .then(data => console.log('data returned:', JSON.stringify(data)));

    var data = JSON.stringify({
      query: `query{
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
}`,
      variables: {},
    });

    var config = {
      method: 'post',
      url: 'https://jobsrabbitstrapidev.herokuapp.com/graphql',
      headers: {
        'Content-Type': 'application/json',
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });

    return this.jobsService.getAllJobs();
  }
}
