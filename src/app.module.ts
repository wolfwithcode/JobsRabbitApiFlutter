import { Module } from '@nestjs/common';
import { JobsModule } from './jobs/jobs.module';
import { SearchModule } from './search/search.module';
import { CmsModule } from './cms/cms.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    JobsModule, SearchModule, CmsModule
  ],
})
export class AppModule {}
