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
  tablePage: number = 0;

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
    this.tablePage = 0; // Reset to first page on new request
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

  isJson(val: any): boolean {
    return typeof val === 'object' && val !== null;
  }

  formatJson(val: any): string {
    return JSON.stringify(val, null, 2);
  }

  isJsonArray(val: any): boolean {
    return Array.isArray(val) && val.length > 0 && typeof val[0] === 'object';
  }

  getKeys(val: any[]): string[] {
    return val && val.length > 0 ? Object.keys(val[0]) : [];
  }

  getValue(row: unknown, key: string): any {
    if (row && typeof row === 'object' && row !== null) {
      return (row as Record<string, any>)[key];
    }
    return '';
  }

}
