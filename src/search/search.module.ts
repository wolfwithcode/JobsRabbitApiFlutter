import { Module } from '@nestjs/common';
import { ElasticsearchModule } from '@nestjs/elasticsearch';
import { SearchService } from './search.service';

@Module({
    imports: [ElasticsearchModule.register({
      node: 'https://search-stbhcm-yrvycc33go65pgbmo33fmlqwhy.us-east-2.es.amazonaws.com',
    })],
    providers: [SearchService],
    exports: [SearchService, ElasticsearchModule],
  })
export class SearchModule {}
