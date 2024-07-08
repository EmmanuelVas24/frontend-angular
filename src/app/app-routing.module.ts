import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GetdataComponent } from './getdata/getdata.component';
import { AppComponent } from './app.component';

export const routes: Routes = [
  { path: 'home', component: AppComponent},
  { path: 'getdata', component: GetdataComponent},
  { path: '', component: AppComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }