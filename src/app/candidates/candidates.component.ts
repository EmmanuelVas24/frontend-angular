import { Component, OnInit } from '@angular/core';
import { CandidatesService } from '../services/candidates.service';

@Component({
  selector: 'app-candidates',
  templateUrl: './candidates.component.html',
  styleUrls: ['./candidates.component.css']
})
export class CandidatesComponent implements OnInit {
  candidates: any[] = [];

  constructor(private candidatesService: CandidatesService) {}

  ngOnInit(): void {
    this.candidatesService.getCandidates().subscribe(
      (response) => {
        this.candidates = response;
      },
      (error) => {
        console.error('Error fetching candidates:', error);
      }
    );
  }
}
