import { Component, OnInit } from '@angular/core';
import {
  Location,
  LocationStrategy,
  PathLocationStrategy,
} from '@angular/common';
@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.css'],
  providers:[Location, { provide: LocationStrategy, useClass: PathLocationStrategy },]
})
export class PageNotFoundComponent implements OnInit {

  location: Location;
  constructor(location: Location) { 
    this.location = location;
  }

  ngOnInit(): void {
  }
  returnPage(){
    this.location.back();
  }
}
