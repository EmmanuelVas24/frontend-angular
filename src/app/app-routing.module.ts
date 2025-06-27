import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GetdataComponent } from './getdata/getdata.component';
import { AppComponent } from './app.component';
import { CandidatesComponent } from './candidates/candidates.component';
import { InterviewsComponent } from './interviews/interviews.component';

export const routes: Routes = [
  { path: '', redirectTo: 'getdata', pathMatch: 'full' },
  { path: 'home', component: AppComponent},
  { path: 'getdata', component: GetdataComponent},
  { path: 'candidates', component: CandidatesComponent },
  { path: 'interviews', component: InterviewsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }