import { HttpStatus, Injectable } from '@nestjs/common';
import axios from 'axios';
const URL = 'https://jobsrabbitstrapidev.herokuapp.com';

enum MESSAGE {
    SUCCESS = 'success',
    FAILED = 'failed',
    NOT_FOUND = 'not found',
}


@Injectable()
export class CmsService {
  async findJobs(query) {
    try {
      console.log('query ', query);
      const { _start, _limit } = query;
      const { data: jobs } = await axios.get(
        `${URL}/jobs?_start=${_start || 0}&_limit=${_limit || 100}`,
      );

      //   console.log('data', data);
      return {
        code: HttpStatus.OK,
        message: MESSAGE.SUCCESS,
        data: {
          total: jobs.length,
          data: jobs,
        },
      };
    } catch (error) {
      console.log(error);
      return {
        code: HttpStatus.BAD_REQUEST,
        message: MESSAGE.NOT_FOUND,
        data: {
        },
      };
    }
  }

  async findOneJob(id) {
    try {
      console.log('id ', id);
      
      const { data: job } = await axios.get(
        `${URL}/jobs/${id}`,
      );

      //   console.log('data', data);
      return {
        code: HttpStatus.OK,
        message: MESSAGE.SUCCESS,
        data: job
      };
    } catch (error) {
      console.log(error);
      return {
        code: HttpStatus.BAD_REQUEST,
        message: MESSAGE.NOT_FOUND,
        data: {
        },
      };
    }
  }
}
