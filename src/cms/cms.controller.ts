import { Controller, Get, Param, Query } from '@nestjs/common';
import { CmsService } from './cms.service';

@Controller('cms')
export class CmsController {
    constructor(private cmsService: CmsService) {}
  @Get('jobs')
  findJobs(@Query() query) {
      console.log('query ', query)
    //   const {start, limit} = query
    //   console.log('param start, limit ', start, limit)
    return this.cmsService.findJobs(query);
  }

  @Get('jobs/:id')
  findOneJob(@Param('id') id: string){
    // console.log("id Param", id)
    return this.cmsService.findOneJob(id);
  }
}
