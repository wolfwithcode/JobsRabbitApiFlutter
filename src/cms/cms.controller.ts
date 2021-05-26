import { Controller, Get, Query } from '@nestjs/common';
import { CmsService } from './cms.service';

@Controller('cms')
export class CmsController {
    constructor(private cmsService: CmsService) {}
  @Get('jobs')
  async findJobs(@Query() query) {
      console.log('query ', query)
    //   const {start, limit} = query
    //   console.log('param start, limit ', start, limit)
    return this.cmsService.findJobs(query);
  }
}
