import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';


export class tableclass{
  constructor(
    public id: string
  ){}
}

@Component({
  selector: 'app-getdata',
  templateUrl: './getdata.component.html',
  styleUrl: './getdata.component.css'
})
export class GetdataComponent{
  table: tableclass[] = [];
  constructor(
    private httpClient: HttpClient
  ){}
  ngOnInit(): void {
    this.getData();
    console.log(this.table);
  }

  getData(){
    this.httpClient.get<any>('http://[::1]:3000/mogomodels').subscribe(
      response => {
        console.log(response);
        this.table = response;
      }
    )
  }

}