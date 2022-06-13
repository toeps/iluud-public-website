import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MainService } from '../../../Services/main.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Router, ActivatedRoute } from '@angular/router';
import { filter } from 'rxjs/operators';
// import * as _moment from "moment";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss']
})
export class NewComponent implements OnInit {
  

  responsiveOptions

  startTime = [["00:00", "00:30","01:00","01:30","02:00","02:30","03:00","03:30","04:00","04:30", "05:00", "05:30", "06:00",
  "06:30", "07:00", "07:30","08:00", "08:30", "09:00", "09:30","10:00 ", "10:30", "11:00", "11:30","12:00","12:30","13:00",
  "13:30","14:00","14:30","15:00","15:30","16:00","16:30", "17:00", "17:30", "18:00", "18:30", "19:00", "19:30","20:00", 
  "20:30", "21:00", "21:30", "22:00","22:30", "23:00", "23:30"]]

  endTime = [["00:00", "00:30","01:00","01:30","02:00","02:30","03:00","03:30","04:00","04:30", "05:00", "05:30", "06:00",
  "06:30", "07:00", "07:30","08:00", "08:30", "09:00", "09:30","10:00 ", "10:30", "11:00", "11:30","12:00","12:30","13:00",
  "13:30","14:00","14:30","15:00","15:30","16:00","16:30", "17:00", "17:30", "18:00", "18:30", "19:00", "19:30","20:00", 
  "20:30", "21:00", "21:30", "22:00","22:30", "23:00", "23:30"]]

  bookingForm: FormGroup
  submitted: boolean = false;
  phoneNo: any;
  name: string;
  WorkerID: any;
  servicelist: any;
  building: string;
  street: string;
  suburg: string;
  city: string;
  myaddress: string;
  WorkerRate: any;
  stime: any;
  etime: any;
  date: Date;
  addDetails: any;
  addressData: string;
  myadd: any;
  addressValue: any;

  constructor(
    private service: MainService, private formbuilder: FormBuilder, private route: ActivatedRoute,
    private ngxService: NgxUiLoaderService, private router: Router, private toastr: ToastrService) { }

  ngOnInit() {

  this.WorkerID = localStorage.getItem('WorkerId');
  this.ServiceList()

  this.bookingForm = this.formbuilder.group({
    services: ["", [Validators.required]],
    calender: [""],
    workerStartTime: [""],
    workerEndTime: [""],
    name: [""],
    contactNumber: [""],
    Address: ["", [Validators.maxLength(100)]],
  })

  this.addressData = localStorage.getItem('addressData')
  // console.log(this.addressData, "!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
  this.myadd = JSON.parse(this.addressData)
  // console.log(this.myadd, "@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@")

    this.name = localStorage.getItem('name');
    this.phoneNo = localStorage.getItem('telephone');

    this.building = this.myadd.building
    this.street = this.myadd.street
    this.suburg = this.myadd.suburb
    this.city = this.myadd.city
    this.addressValue = this.myadd.id   
    this.myaddress = this.building + ', ' + this.street + ', ' + this.suburg + ', ' + this.city;
    console.log(this.myaddress, "&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&")
     this.setValue();

    this.bookingForm.get('name').disable();
    this.bookingForm.get('contactNumber').disable();
  }

  startTimeval(value){
    this.stime = value;
  console.log(this.stime, "11111111111111111111111")
  }

  endTimeval(value){
    this.etime = value;
    console.log(this.etime, "222222222222222222222222")
    }

  ServiceList(){
    this.ngxService.start();
    let data = {
      worker_id: this.WorkerID
    };
    this.service.post1(data, "service_list").pipe().subscribe(response => {
      if(response.api_status){
        this.ngxService.stop()
        this.servicelist = response.data.service_list;
        this.WorkerRate = response.data.price;
        // console.log(this.servicelist, "222222222222222222222222222222")
      }else{
        this.ngxService.stop();
        this.toastr.error(response.message);
      }
    })
}

  get values(){
    return this.bookingForm.controls;
  }

  bookingSubmit(){
    this.submitted = true;
    if(this.bookingForm.valid){
      if(this.stime < this.etime){
      // console.log(this.bookingForm, "1111111111111111111111111111")
      this.ngxService.start();
      let data = {
        service_id: this.values.services.value,
        date: this.date,
        booking_price: this.WorkerRate,
        start_time: this.stime,
        end_time: this.etime,
        address: this.addressValue.toString()
      };
      this.service.post1(data , "request_booking").pipe().subscribe(response => {
        if(response.api_status){
          this.ngxService.stop()
          localStorage.removeItem('addressData')
          this.bookingForm.reset();
          this.toastr.success(response.message);
          this.router.navigate(['/service/details'])
        }else{
          this.ngxService.stop();
          this.toastr.error(response.message)
        }
      })
    }
    else{
      this.toastr.info('End time should be greater than Start time')
    }
    }
    else{
      this.toastr.info('Form is not Valid')
    }
  }

  setValue() {
    this.bookingForm.patchValue({
      Address: this.myaddress,
    });
  }

}
