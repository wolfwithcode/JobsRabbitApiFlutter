import { Module } from '@nestjs/common';
import { SearchModule } from 'src/search/search.module';
import { SearchService } from 'src/search/search.service';
import { JobsController } from './jobs.controller';
import { JobsService } from './jobs.service';

@Module({
  imports: [SearchModule],
  controllers: [JobsController],
  providers: [JobsService]
})
export class JobsModule {}
