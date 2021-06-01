import { HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { config } from 'config';
const {apiUrl: API_URL} = config().cms;
console.log('API_URL ', API_URL)
export enum MESSAGE {
  SUCCESS = 'success',
  FAILED = 'failed',
  NOT_FOUND = 'not found',
}

const createJobInput = (body) => {
  return {
    state: 'California',
    city: 'Long Beach',
    address: '511 W. Willow St.',
    zipcode: '90806',
    isCrawled: true,
    callTo: '12:00:00.000',
    callFrom: '00:00:00.000',
    showPhone: true,
    photo:
      'https://www.nguoivietabc.com/files/09-2020/ad2746/tiem-pho-can-nam-bep-1806608024_large.jpg',
    salary: '0',
    email: '',
    phone: '7148372',
    description:
      'Tiệm Phở cần Nam bếp phở phải có kinh nghiệm làm full-time. Nhận check. Gọi sau 2pm: A. Bình',
    title: 'TIỆM PHỞ CẦN NAM BẾP PHỞ',
    employer: '604632251fcc3454d0829517',
    jobCategory: '6038c4360626cc335a6ff2a6',
    salaryCategory: '6038c5a009662c34b493313a',
    subsciptionCategory: '6038c64d09662c34b493313f',
    template: '604d73a449663a2f9faf7fcd',
  };
};

@Injectable()
export class CmsService {
  constructor(private configService: ConfigService){

  }
  async findJobs(query) {
    try {
      const API_URL = this.configService.get('API_URL');
      console.log('API_URL ', API_URL)
      console.log('query ', query);
      const { _start, _limit } = query;
      const { data: jobs } = await axios.get(
        `${API_URL}/jobs?_start=${_start || 0}&_limit=${_limit || 100}`,
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
        data: {},
      };
    }
  }

  async findOneJob(id) {
    try {
      const API_URL = this.configService.get('API_URL');
      console.log('id ', id);

      const { data: job } = await axios.get(`${API_URL}/jobs/${id}`);

      //   console.log('data', data);
      return {
        code: HttpStatus.OK,
        message: MESSAGE.SUCCESS,
        data: job,
      };
    } catch (error) {
      console.log(error);
      return {
        code: HttpStatus.BAD_REQUEST,
        message: MESSAGE.NOT_FOUND,
        data: {},
      };
    }
  }

  async createJob(body) {
    try {
      const API_URL = this.configService.get('API_URL');
      const bodyParameters = createJobInput(body);
      // const bodyParameters = body;
      const response = await axios.post(`${API_URL}/jobs`, bodyParameters);
      const { data: job } = response;
      // console.log("data", JSON.stringify(data));
      return {
        code: HttpStatus.OK,
        message: MESSAGE.SUCCESS,
        data: job,
      };
    } catch (error) {
      return {
        code: HttpStatus.BAD_REQUEST,
        message: MESSAGE.NOT_FOUND,
        data: {},
      };
    }
  }
}
