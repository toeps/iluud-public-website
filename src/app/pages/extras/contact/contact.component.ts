import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MainService } from '../../../Services/main.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  contactForm: FormGroup;
  submitted: boolean = false;

  constructor(private service: MainService, private ngxService: NgxUiLoaderService,
    private router: Router, private formbuilder: FormBuilder, private toastr: ToastrService) { }

  ngOnInit() {

    this.contactForm = this.formbuilder.group({
      name: ["", [Validators.required, Validators.maxLength(30)]],
      email: ["", [Validators.required, Validators.maxLength(30), Validators.pattern(/^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-])+\.([A-Za-z]{2,6})$/)]],
      message: ["",[Validators.required, Validators.maxLength(1000)]]
    })
  }

  get values(){
    return this.contactForm.controls;
  }

  contactSubmit(){
    this.submitted = true;
    if(this.contactForm.valid){
      this.ngxService.start();
      let data ={
        user_id: "",
        name : this.values.name.value,
        email: this.values.email.value,
        message: this.values.message.value
      };
      this.service.post1(data , "contact_us").pipe().subscribe(response => {
        if(response.api_status){
          this.ngxService.stop();
          this.contactForm.reset();
          this.toastr.success(response.message);
          this.router.navigate(['/user'])
        }else{
          this.ngxService.stop();
          this.toastr.error(response.message);
        }
      });
    }else{
      // alert("form is not valid")
      this.toastr.info('Form is not valid')
    }
  }
}
