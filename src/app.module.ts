import { Module } from '@nestjs/common';
import { JobsModule } from './jobs/jobs.module';
import { SearchModule } from './search/search.module';
import { CmsModule } from './cms/cms.module';

@Module({
  imports: [JobsModule, SearchModule, CmsModule],
})
export class AppModule {}
