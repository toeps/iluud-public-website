import { Component, OnInit } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MainService } from '../../../Services/main.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss']
})
export class FeedbackComponent implements OnInit {

  // val: number;
  // val1: number;
  // val2: number
  // val3: number;
  // val4: number;

  submitted: boolean = false;
  feedbackForm: FormGroup;

  constructor(private ngxService: NgxUiLoaderService, private router:Router,
    private service: MainService, private formbuilder: FormBuilder, private toastr: ToastrService) { }

  ngOnInit() {

    this.feedbackForm = this.formbuilder.group({
      control1: [""],
      control2: [""],
      control3: [""],
      control4: [""],
      control5: [""],
      feedback:["", [Validators.required, Validators.maxLength(1000)]]
    })
  }

  profileData = {
    "image": "assets/images/png/profile.png", "name": "John Jones", "rating": "4.7", "desc": `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
            industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and
            scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap`, "rate": "35", "subCategory": `Kitchen Cleaning, Household, AC Service...`, "startHours": "08:00 AM", "endHours": "10:00 PM", "exp": "3.5",
            "serviceType":"Kitchen Cleaning", "serviceTime":"2hrs 40min","serviceDate":"12th Oct 2019"
  }


  feedbackSubmit(){
    this.submitted = true
    this.ngxService.start();
      let data= {
        ratingData: [{
          question_id: "1",
          rating: this.values.control1.value
        },
        {
          question_id: "2",
          rating: this.values.control2.value
        },
        {
          question_id: "3",
          rating: this.values.control3.value
        },
        {
          question_id: "4",
          rating: this.values.control4.value
        },
        {
          question_id: "5",
          rating: this.values.control5.value
        }],
        booking_id: "100",
        receiver_id: "101",
        description: this.values.feedback.value
      }
      this.service.post1(data, "feedback_post").pipe().subscribe(response => {
        if(response.api_status){
          this.ngxService.stop();
          this.feedbackForm.reset();
          this.toastr.success(response.message);
          // this.router.navigate(['/'])
        }else{
          this.ngxService.stop();
          this.toastr.error(response.message);
        }
      })
    }

    get values(){
      return this.feedbackForm.controls;
    }
}
