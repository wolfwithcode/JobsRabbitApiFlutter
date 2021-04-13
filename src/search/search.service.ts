import { Injectable } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';
const axios = require('axios');

@Injectable()
export class SearchService {
  constructor(private readonly elasticsearchService: ElasticsearchService) {}

  async search(queryBuilder) {
    console.log("queryBuilder ", queryBuilder)
     const { body } = await this.elasticsearchService.search({
      index: 'strapi_jobs_2',
      body:queryBuilder
    })
    const hits = body.hits;
    // return hits.map((item) => item._source);
    return hits;
  }
}