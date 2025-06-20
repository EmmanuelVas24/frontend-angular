import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GetdataComponent } from './getdata/getdata.component';
import { AppComponent } from './app.component';
import { WelcomeComponent } from './welcome.component';
import { InteractiveWidgetComponent } from './interactive-widget.component';
import { MonitoringComponent } from './monitoring.component';

export const routes: Routes = [
  { path: 'home', component: WelcomeComponent },
  { path: 'getdata', component: GetdataComponent },
  { path: 'interactive-widget', component: InteractiveWidgetComponent },
  { path: 'monitoring', component: MonitoringComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }