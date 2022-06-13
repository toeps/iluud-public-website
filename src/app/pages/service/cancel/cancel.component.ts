import { Component, OnInit } from '@angular/core';
import { MainService } from '../../../Services/main.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cancel',
  templateUrl: './cancel.component.html',
  styleUrls: ['./cancel.component.scss']
})
export class CancelComponent implements OnInit {

  cancelForm: FormGroup;
  submitted: boolean = false;
  list: any;

  constructor(private service: MainService, private ngxService: NgxUiLoaderService, private toastr: ToastrService,
    private router: Router, private FormBuilder: FormBuilder) { }

  ngOnInit() {
    this.getdata();

    this.cancelForm = this.FormBuilder.group({
      reason:["", [Validators.required]],
      mainReason: ["", [Validators.required, Validators.maxLength(1000)]]
    })
  }

  getdata() {

    this.ngxService.start();
    this.service
      .get(
        `general?type=2`
      )
      .pipe()  
      .subscribe(response => {
        if (response.api_status) {
          this.ngxService.stop();
          this.list = response.data.booking_cancel_reason;
        } else {
          this.ngxService.stop();
          this.toastr.error(response.message);
        }
      });
  }

  // cancelBooking(){
  //  this.submitted = true;
  //  if(this.cancelForm.valid){
  //    this.ngxService.start();
  //    let data={
  //     booking_id: this.values.reason.value,
  //     reason: this.values.mainReason.value
  //    };
  //    this.service.post1(data, "cancel_booking").pipe().subscribe(response => {
  //      if(response.api_status){
  //        this.ngxService.stop();
  //        this.cancelForm.reset();
  //        this.router.navigate(['/user'])
  //      }else{
  //        this.ngxService.stop();
  //      }
  //    });
  //  }
  // }

  cancelBooking(){
    this.submitted = true;
    if(this.cancelForm.valid){
      this.ngxService.start();
      let data = {
        booking_id: "",
        reason: this.values.mainReason.value
      };
      this.service.post1(data, "cancel_booking").pipe().subscribe(response => {
        if(response.api_status){
          this.ngxService.stop();
          this.cancelForm.reset();
          this.toastr.success(response.message);
        }else{
          this.ngxService.stop();
          this.toastr.error(response.message);
        }
      })
    }
  }

  get values(){
    return this.cancelForm.controls;
  }

}
