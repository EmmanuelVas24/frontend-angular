import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule, routes } from './app-routing.module';
import { AppComponent } from './app.component';
import { GetdataComponent } from './getdata/getdata.component';
import { WelcomeComponent } from './welcome.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule, provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InteractiveWidgetComponent } from './interactive-widget.component';
import { MonitoringComponent } from './monitoring.component';
import { DatalakeComponent } from './datalake.component';

@NgModule({
  declarations: [
    AppComponent,
    GetdataComponent,
    WelcomeComponent,
    InteractiveWidgetComponent,
    MonitoringComponent,
    DatalakeComponent
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
