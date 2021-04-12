import { Injectable } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';
const axios = require('axios');

@Injectable()
export class SearchService {
  constructor(private readonly elasticsearchService: ElasticsearchService) {}

  async test() {
   
    const data = '';
    
    const config = {
      method: 'get',
      url: 'https://search-stbhcm-yrvycc33go65pgbmo33fmlqwhy.us-east-2.es.amazonaws.com/strapi_jobs/_search?q=anh',
      headers: { },
      data : data
    };
    
    axios(config)
    .then(function (response) {
      console.log(JSON.stringify(response.data));
    })
    .catch(function (error) {
      console.log(error);
    });
    
  }
}