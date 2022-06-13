import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { MainService } from 'src/app/Services/main.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.scss']
})
export class BookingsComponent implements OnInit {
  requestData: any;

  constructor( private formbuilder: FormBuilder, private router: Router, 
    private service: MainService, private ngxService: NgxUiLoaderService, 
    private toastr: ToastrService) { }

  ngOnInit() {
    this.bookinglisting();
  }

  bookingDetails = [
    {
      "name":"Ryan Finch","location":"Cape Town, US","rating" : "4.7","reviews":"35"
    },
    {
      "name":"John Miller","location":"Cape Town, US","rating" : "4.7","reviews":"35"
    }
  ]



  bookinglisting(){
    this.ngxService.start();
   this.service.get1("user_booking_listing?page_no=1&type=").pipe()
   .subscribe(response => {
     if(response.api_status){
       this.ngxService.stop();
       this.requestData = response.data.booking_listing;
     }else{
       this.ngxService.stop();
       this.toastr.error(response.message);
     }
   })
  }
}
