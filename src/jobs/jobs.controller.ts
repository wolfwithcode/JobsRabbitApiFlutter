import { Controller, Get, Query } from '@nestjs/common';
import { JobsService } from './jobs.service';

@Controller('jobs')
export class JobsController {
  constructor(private jobsService: JobsService) {}

  @Get()
  async getManyJobs(@Query() query) {
      const {start, limit} = query
      console.log('param start, limit ', start, limit)
    return this.jobsService.getManyJobs(start || 0, limit || 100);
  }
}
