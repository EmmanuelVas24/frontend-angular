import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GetdataComponent } from './getdata/getdata.component';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent {
  today = new Date();
  now = new Date();
  method: string = 'GET';
  url: string = '';
  body: string = '';
  response: any = null;
  error: string = '';
  methods: string[] = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'];
  sendAsJson: boolean = true;

  constructor(private router: Router) {
    setInterval(() => {
      this.now = new Date();
    }, 1000);
  }

  goToGetData() {
    this.router.navigate(['/getdata']);
  }

  sendRequest() {
    this.response = null;
    this.error = '';
    const options: RequestInit = {
      method: this.method,
      headers: { 'Content-Type': this.sendAsJson ? 'application/json' : 'text/plain' },
    };
    if (['POST', 'PUT', 'PATCH'].includes(this.method) && this.body) {
      if (this.sendAsJson) {
        try {
          options.body = JSON.stringify(JSON.parse(this.body));
        } catch (e) {
          this.error = 'Invalid JSON in request body.';
          return;
        }
      } else {
        options.body = this.body;
      }
    }
    fetch(this.url, options)
      .then(async res => {
        const text = await res.text();
        try {
          return JSON.parse(text);
        } catch {
          return text;
        }
      })
      .then(data => this.response = data)
      .catch(err => this.error = err.message || 'Request failed.');
  }

  
}
