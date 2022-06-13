import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MainService } from '../../../Services/main.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
// import { StorageService } from 'src/app/Services/storage.service';
import { Pipe, PipeTransform } from "@angular/core";
import { timer, Subscription } from "rxjs";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit, OnDestroy {

  closeResult: string;
  visibleSidebar2;
  submitted: boolean = false;
  countDown: Subscription;
  counter = 360; 
  tick = 1000;
  promoForm: FormGroup;
  bookingForm:FormGroup;
  requestData: any;
  totalPrice: any;
  totalBooking: any;
  flatFee: string;
  percFee: string;
  adminValue: number;
  totalPricenew: number;
  discountPrice: any;
  bookingId: any;
  parc: number;
  flatf: number;
  couponId: any;
  productId: any = [];
  bookingdatalist: any;
  orderDetails: any;

  constructor(private modalService: NgbModal, private formbuilder: FormBuilder, private router: Router, 
    private service: MainService, private ngxService: NgxUiLoaderService, private toastr: ToastrService) { }

  ngOnInit() {
    this.bookinglisting();
    this.Timercountdown()

    this.promoForm = this.formbuilder.group({
      promoCode:["", [Validators.required ,Validators.maxLength(15)]]
    })

    this.bookingForm = this.formbuilder.group({
      instruction:["", [Validators.maxLength(500)]]
    })

    this.flatFee = localStorage.getItem('flatfeeuser');
    this.percFee = localStorage.getItem('percentagefeeuser');
      
  }

  open(content) {

    this.modalService.open( content, { centered: true,windowClass: "congrats-modal",size:"md"  });
  }

  bookinglisting(){
    this.ngxService.start();
   this.service.get1("user_booking_listing?page_no=1&type=1").pipe()
   .subscribe(response => {
     if(response.api_status){
       this.ngxService.stop();
       this.requestData = response.data.booking_listing;
       if(this.totalPrice == null || this.totalPrice == undefined){
        this.totalPrice = 0;
       }
       for( let i=0; i < this.requestData.length; i++ ){
         this.totalPrice = this.totalPrice + this.requestData[i].booking_price;
         this.productId.push(this.requestData[i].id);
       }
       this.adminVal();
      this.totalPri();
       
      //  for(let j=0; j < this.requestData.length; j ++){
      //   this.productId = this.productId + this.requestData[j].id 
      //  }
       console.log(this.productId, "222222233333344444444444555555555566666666")

     }else{
       this.ngxService.stop();
       this.toastr.error(response.message);
     }
   })
  }

  adminVal(){
    if(this.discountPrice == null || this.discountPrice == undefined){
      this.discountPrice = 0
    }
    this.parc = parseInt(this.percFee)
    this.flatf = parseInt(this.flatFee)
    this.adminValue = (((this.totalPrice - this.discountPrice) * this.parc) / 100) + this.flatf;
    console.log(this.adminValue, "22222222222222222222222222222222")
    return this.adminValue;
  }

  totalPri(){
    if(this.discountPrice == null || this.discountPrice == undefined){
      this.discountPrice = 0
    }
    this.totalPricenew = (this.totalPrice - this.discountPrice) + this.adminValue;
    console.log(this.totalPricenew, "33333333333333333333333333333333333333")
    return this.totalPricenew;
  }

  get values(){
    return this.promoForm.controls;
  }
  get insValue(){
    return this.bookingForm.controls;
  }

  applyCoupon(){
    this.submitted = true;
    if(this.promoForm.valid){
    this.ngxService.start();
    let data = {
      amount: this.totalPrice.toString(),
      coupon: this.values.promoCode.value
    };
    this.service.post1(data, "apply_coupon").pipe().subscribe(response => {
      if(response.api_status){
        this.ngxService.stop();
        this.discountPrice = response.data.coupun_detail.value;
        this.couponId = response.data.coupun_detail.coupon_id;
        this.adminVal();
        this.totalPri();
        this.toastr.success(response.message);
      }else{
        this.ngxService.stop();
        this.toastr.error(response.message);
      }
    })   
  } 
  }


  requestBooking(){
    this.submitted = true;
    this.ngxService.start();
    let data = {
      booking_ids: this.productId,
      price: this.totalPricenew.toString(),
      coupon_id: this.couponId,
      discount_price: this.discountPrice,
      instructions: this.insValue.instruction.value,
      coupon: this.values.promoCode.value
    };
    this.service.post1(data, "request_order").pipe().subscribe(response => {
      if(response.api_status){
        this.ngxService.stop();
        this.bookingdatalist = response.data.get_booking_lists;
        this.orderDetails = response.data.get_order_details;
        console.log( this.bookingdatalist, this.orderDetails, "qwertyuiopasdfghjklzxcvbnm,")
        this.toastr.success(response.message);
        this.router.navigate(['/service/completed'])
      }else{
        this.ngxService.stop();
        this.toastr.error(response.message);
      }
    });
  }

  /***************** TIMER FUNCTIONALITY *******************/
  ngOnDestroy(){
    this.countDown=null;
  }

  Timercountdown(){
    this.countDown = timer(0, this.tick).subscribe(() => --this.counter);
    // this.router.navigate(['/user'])
  
  }


/************** TIMER FUNCTIONALITY ENDS*******************/
}
@Pipe({
  name: "formatTime"
})
export class FormatTimePipe implements PipeTransform {
  transform(value: number): string {
    const minutes: number = Math.floor(value / 60);
    if(value > 0){
    return (
      ("00" + minutes).slice(-2) +
      ":" +
      ("00" + Math.floor(value - minutes * 60)).slice(-2)
    );}
    else {
      // alert("Booking time has expired")
      // this.router.navigate(['/user'])
      return (
      ("00:00")
    );
    }
  }
  constructor( private router: Router) { }

}