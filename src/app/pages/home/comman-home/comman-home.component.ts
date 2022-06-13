import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-comman-home',
  templateUrl: './comman-home.component.html',
  styleUrls: ['./comman-home.component.scss'],
  encapsulation: ViewEncapsulation.None

})
export class CommanHomeComponent implements OnInit {

  responsiveOptions
  profile = [
    { "workerName": "Josh Miller" },
    { "workerName": "John Miller" },
    { "workerName": "Garry Miller" },
    { "workerName": "George Miller" },
    { "workerName": "Harry Miller" },
    { "workerName": "Smith Miller" },
    { "workerName": "Josh George" },
    { "workerName": "John Carlton" },
    { "workerName": "Garry Carlton" },
    { "workerName": "George Carlton" }
  ]
  constructor() {

    this.responsiveOptions = [
      {
        breakpoint: '1024px',
        numVisible: 3,
        numScroll: 3
      },
      {
        breakpoint: '768px',
        numVisible: 2,
        numScroll: 2
      },
      {
        breakpoint: '560px',
        numVisible: 1,
        numScroll: 1
      }
    ];

  }

  ngOnInit() {
  }


}
