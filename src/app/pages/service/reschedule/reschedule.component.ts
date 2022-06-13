import { Component, OnInit } from '@angular/core';
import { MainService } from '../../../Services/main.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-reschedule',
  templateUrl: './reschedule.component.html',
  styleUrls: ['./reschedule.component.scss']
})
export class RescheduleComponent implements OnInit {

  rescheduleForm: FormGroup;
  submitted:boolean = false;

  constructor(private service: MainService, private ngxservice: NgxUiLoaderService,
    private router: Router, private formbuilder: FormBuilder, private toastr: ToastrService) { }

  ngOnInit() {


    this.rescheduleForm = this.formbuilder.group({
      service:["",[Validators.required]],
      BookingDate: ["", [Validators.required]],
      startTime: ["", [Validators.required]],
      endTime: ["", [Validators.required]],
      reason: ["", [Validators.maxLength(1000)]]
    })
  }

  get values(){
    return this.rescheduleForm.controls;
  }

  reschedule(){
    this.submitted = true;
    if(this.rescheduleForm.valid){
      this.ngxservice.start();
      let data= {
        booking_id:"3",
        date: this.values.BookingDate.value,
        start_time: this.values.startTime.value,
        end_time: this.values.endTime.value,
        reason: this.values.reason.value,
        service_id: "2"
      }
      this.service.post1(data, "user_reschedule_booking").pipe().subscribe(response => {
        if(response.api_status){
          this.ngxservice.stop();
          this.rescheduleForm.reset();
          this.toastr.success(response.message);
          // this.router.navigate(['/'])
        }else{
          this.ngxservice.stop();
          this.toastr.error(response.message);
        }
      })
    }
  }

}
