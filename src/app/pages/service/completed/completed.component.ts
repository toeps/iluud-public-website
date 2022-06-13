import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MainService } from '../../../Services/main.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-completed',
  templateUrl: './completed.component.html',
  styleUrls: ['./completed.component.scss'],
  encapsulation: ViewEncapsulation.None,

})
export class CompletedComponent implements OnInit {
  closeResult: string;
   summarydetail: [];
  bookingData: any;
  val: number = 15;

  constructor(private modalService: NgbModal, private service: MainService, private ngxservice: NgxUiLoaderService,
    private router: Router, private formbuilder: FormBuilder, private toastr: ToastrService) { }

  ngOnInit() {
    this.BookingDetails();
  }

  openVerticallyCentered(content) {
    this.modalService.open(content, { centered: true, windowClass:"add-modal" });
  }


  BookingDetails(){
    this.ngxservice.start();
    let data = {
      booking_id: "724",
    }
    this.service.post1(data, "booking_detail").pipe().subscribe(response => {
      if(response.api_status){
        this.ngxservice.stop();
        this.bookingData = response.data.booking_detail;
      }else{
        this.ngxservice.stop();
        this.toastr.error(response.message);
      }
    })
  }

  AddMoreTime(){
    this.ngxservice.start();
    let data= {
      booking_id: "724",
      extra_time: this.val.toString()
    }
    this.service.post1(data, "add_more_time").pipe().subscribe(response => {
      if(response.api_status){
        this.ngxservice.stop();
        this.modalService.dismissAll();
        this.toastr.success(response.message);
        this.BookingDetails(); 
      }else{
        this.ngxservice.stop()
        this.toastr.error(response.message);
      }
    })
  }

  clickPlus(){
    if(this.val == 300){
      this.val = 300
      return this.val
    }
    this.val = this.val + 15;
    return this.val
  }

  clickMinus(){
    if(this.val == 0){
      this.val == 0
      return this.val
    }
    this.val = this.val - 15;
    return this.val;
  }

}
