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
  groupBy: string = '';
  groupedData: { [key: string]: any[] } = {};
  groupOptions = [
    { value: '', label: 'None' },
    { value: 'interviewerName', label: 'Interviewer' },
    { value: 'jobTitle', label: 'Job Title' },
    { value: 'candidateName', label: 'Candidate' }
  ];

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
      this.updateGrouping();
    }).catch(error => {
      console.error('Error fetching data:', error);
    });
  }

  onGroupByChange() {
    this.updateGrouping();
  }

  updateGrouping() {
    if (!this.groupBy) {
      this.groupedData = {};
      return;
    }
    this.groupedData = this.mappedInterviews.reduce((acc, interview) => {
      const key = interview[this.groupBy] || 'Unknown';
      if (!acc[key]) acc[key] = [];
      acc[key].push(interview);
      return acc;
    }, {} as { [key: string]: any[] });
  }
}
