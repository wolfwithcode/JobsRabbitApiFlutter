import { HttpStatus, Injectable } from '@nestjs/common';
import axios from 'axios';
@Injectable()
export class CmsService {
  async findJobs(query) {
    try {
      console.log('query ', query);
      const { _start, _limit } = query;
      const { data: jobs } = await axios.get(
        `https://jobsrabbitstrapidev.herokuapp.com/jobs?_start=${_start || 0}&_limit=${_limit || 100}`,
      );

      //   console.log('data', data);
      return {
        code: HttpStatus.OK,
        message: HttpStatus.OK,
        data: {
          total: jobs.length,
          data: jobs,
        },
      };
    } catch (error) {
      console.log(error);
      return {
        code: HttpStatus.BAD_REQUEST,
        message: JSON.stringify(error),
        data: {
        },
      };
    }
  }
}
