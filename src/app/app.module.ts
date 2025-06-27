import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule, routes } from './app-routing.module';
import { AppComponent } from './app.component';
import { GetdataComponent } from './getdata/getdata.component';
import { CandidatesComponent } from './candidates/candidates.component';
import { InterviewsComponent } from './interviews/interviews.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule, provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    GetdataComponent,
    CandidatesComponent,
    InterviewsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    CommonModule,
    FormsModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
  providers: [provideRouter(routes), 
    provideClientHydration(),provideHttpClient()],
  bootstrap: [AppComponent]
})
export class AppModule { }
