// src/app/app.component.ts
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor() {}

  ngOnInit(): void {
   
  }
  filter: any = {};

  onFilterChanged(filter: any): void {
    this.filter = filter;
    console.log(filter)
  }
  
}
