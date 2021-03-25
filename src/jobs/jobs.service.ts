import { Injectable } from '@nestjs/common';

@Injectable()
export class JobsService {
    private jobs = ["kitchen hand", "IT"];
    getAllJobs(){
        return this.jobs;
    }
}
