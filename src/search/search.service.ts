import { Injectable } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';
const axios = require('axios');

@Injectable()
export class SearchService {
  constructor(private readonly elasticsearchService: ElasticsearchService) {}

  async test() {
   
     const { body } = await this.elasticsearchService.search({
      index: 'strapi_jobs',
      body: {
        "query": {
            "match_all": {}
          }
      }
    })
    const hits = body.hits.hits;
    return hits.map((item) => item._source);
  }
}