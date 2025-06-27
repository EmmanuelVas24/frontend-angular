import { Component, OnInit } from '@angular/core';
import { JobsService } from '../services/jobs.service';

@Component({
  selector: 'app-getdata',
  templateUrl: './getdata.component.html',
  styleUrl: './getdata.component.css'
})
export class GetdataComponent implements OnInit {
  jobs: any[] = [];

  constructor(private jobsService: JobsService) {}

  ngOnInit(): void {
    this.jobsService.getJobs().subscribe(
      (response) => {
        this.jobs = response;
      },
      (error) => {
        console.error('Error fetching jobs:', error);
      }
    );
  }
}