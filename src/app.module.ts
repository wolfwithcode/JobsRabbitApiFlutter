import { Module } from '@nestjs/common';
import { JobsModule } from './jobs/jobs.module';
import { SearchModule } from './search/search.module';

@Module({
  imports: [JobsModule, SearchModule],
})
export class AppModule {}
