import { Body, Controller, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { JobsService } from './jobs.service';

@Controller('jobs')
export class JobsController {
  constructor(private jobsService: JobsService) {}

  @Get()
  // async getManyJobs(@Query() query) {
  //     const {start, limit} = query
  //   //   console.log('param start, limit ', start, limit)
  //   return this.jobsService.getManyJobs(start || 0, limit || 100);
  // }
  searchWithAlgolia(@Query() query){
    console.log("keyword query", query)
    // const {keyword, zipcode, start, limit, category} = query;
    
    return  this.jobsService.searchWithAlgolia(query);
  }

  @Get('many')
  async getManyJobs(@Query() query) {
      const {start, limit} = query
    //   console.log('param start, limit ', start, limit)
    return this.jobsService.getManyJobs(start || 0, limit || 100);
  }

  @Post()
  createJob(@Body() body){
    console.log('body', body);
    return this.jobsService.createJob(body);
  }


  @Get('/search')
  searchJob(@Query() query){
    console.log("keyword query", query)
    // const {keyword} = query;
    
    return  this.jobsService.searchJobsWithFlexSearch(query);
  }

  @Get(':id')
  getJobById(@Param('id') id: string){
    // console.log("id Param", id)
    return this.jobsService.getJobById(id);
  }

  @Patch(':id')
  updateJob(@Param('id') id: string, @Body() body){
    console.log("id Param", id);
    console.log("body Param", body);
    return this.jobsService.updateJob(id, body);
  }
}
