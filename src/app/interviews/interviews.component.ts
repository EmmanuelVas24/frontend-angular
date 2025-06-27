import { Component, OnInit } from '@angular/core';
import { InterviewsService } from '../services/interviews.service';
import { JobsService } from '../services/jobs.service';
import { CandidatesService } from '../services/candidates.service';

@Component({
  selector: 'app-interviews',
  templateUrl: './interviews.component.html',
  styleUrls: ['./interviews.component.css']
})
export class InterviewsComponent implements OnInit {
  interviews: any[] = [];
  jobs: any[] = [];
  candidates: any[] = [];
  mappedInterviews: any[] = [];

  constructor(
    private interviewsService: InterviewsService,
    private jobsService: JobsService,
    private candidatesService: CandidatesService
  ) {}

  ngOnInit(): void {
    Promise.all([
      this.jobsService.getJobs().toPromise(),
      this.candidatesService.getCandidates().toPromise(),
      this.interviewsService.getInterviews().toPromise()
    ]).then(([jobs, candidates, interviews]) => {
      this.jobs = jobs;
      this.candidates = candidates;
      this.interviews = interviews;
      this.mappedInterviews = this.interviews.map(interview => {
        const job = this.jobs.find(j => j.id === interview.jobId);
        const candidate = this.candidates.find(c => c.id === interview.candidateId);
        return {
          ...interview,
          jobTitle: job ? job.title : 'Unknown',
          candidateName: candidate ? candidate.fullName : 'Unknown'
        };
      });
    }).catch(error => {
      console.error('Error fetching data:', error);
    });
  }
}
