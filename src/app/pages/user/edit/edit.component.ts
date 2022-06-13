import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UploadService } from 'src/app/Services/upload.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { MainService } from '../../../Services/main.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

export interface IFileNameS3 {
  Bucket: string;
  Key: string;
  Location: string;
  key: string;
}
@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  profileForm:FormGroup;
  fName: string;
  contactNo: string;
  emailAddress: string;
  profileImg: string;
  lastName: string;
  selectedFiles: any;
  isuploadFile: boolean = false;
  profileLink: any;
  submitted: boolean = false;
  interval: any;
  timeLeft: any;
  formId: any;
  newphoneNumber: any;
  optflag:boolean = false;
  passwordForm: FormGroup;

  constructor(private modalService: NgbModal,private ngxService: NgxUiLoaderService,
    private formBuilder: FormBuilder,private uploadservice: UploadService,
    private service: MainService, private router: Router,private toastr: ToastrService) { }

  ngOnInit() {
    this.profileForm = this.formBuilder.group({
      firstName: ["", [Validators.required, Validators.maxLength(15)]],
      lastName: ["", [Validators.required, Validators.maxLength(15)]],
      phoneNumber: ["", [Validators.required, Validators.minLength(6), Validators.maxLength(15)]],
      emailId: ["", [Validators.required, Validators.maxLength(30), Validators.pattern(/^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-])+\.([A-Za-z]{2,6})$/)]]
    }),

    this.passwordForm = this.formBuilder.group({
      oldPassword: ["", [Validators.required, Validators.minLength(6), Validators.maxLength(15), Validators.pattern(/^[\S]*$/)]],
      newPassword: ["", [Validators.required, Validators.minLength(6), Validators.maxLength(15), Validators.pattern(/^[\S]*$/)]],
      confirmPassword: ["", [Validators.required, Validators.minLength(6), Validators.maxLength(15), Validators.pattern(/^[\S]*$/)]]
    })

    this.fName = localStorage.getItem('name');
    this.lastName = localStorage.getItem('lname');
    this.contactNo = localStorage.getItem('telephone');
    this.emailAddress = localStorage.getItem('email');
    this.profileLink = localStorage.getItem('profileImg');
    this.formId = localStorage.getItem('id')
    console.log(this.formId)
    console.log(this.profileLink, "kkkkkkkkkkkkkkkkkkkkkkkkk")
    this.setValue()
    this.profileForm.get('emailId').disable();

  }
  openModal(modalname, className) {
    this.submitted = false;
    this.passwordForm.reset();
    this.modalService.dismissAll();
    this.modalService.open(modalname, { centered: true, windowClass: className });
  }

  get values(){
    return this.profileForm.controls;
  }

get passwordvalue(){
  return this.passwordForm.controls;
}

  setValue(){
    this.profileForm.patchValue({
      firstName: this.fName,
      lastName: this.lastName,
      phoneNumber: this.contactNo,
      emailId: this.emailAddress
    })
  }

  selectFile(event) {
    if (event.target.files.length) {
      this.selectedFiles = event.target.files;
      if (event.target.files && event.target.files[0]) {
        const file = event.target.files[0];
        const reader = new FileReader();
        let fileType = this.getFileType(file.name);
        if (fileType) {
          this.isuploadFile = true;
          console.log(this.isuploadFile, "gdgudukhdejkdhekdhwek")
          reader.onload = e => (this.profileLink = reader.result);
          reader.readAsDataURL(file);
          console.log(this.profileLink, "ssssssssssssssssssssssssss")
        } else {
          // this.toaster.error("File is not Valid .");
          // alert("File is not valid");
          this.toastr.info('File is not Valid')
        }
      }
    }
  }
  
  getFileType(filename) {
    if (filename) {
      var filename = filename.substring(filename.lastIndexOf("/") + 1);
      var fileExt = filename
        .split(".")
        .pop()
        .toLowerCase();
      if (
        fileExt == "jpg" ||
        fileExt == "jpeg" ||
        fileExt == "gif" ||
        fileExt == "png"
      ) {
        // || fileExt=='bmp'
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }
  
  async upload() {
    const file = this.selectedFiles.item(0);
    let res = <IFileNameS3>await this.uploadservice.uploadfile(file);
  
    return res;
  }

  profileSubmit(){
    this.submitted = true;
    console.log("1111111111111111111111111")
    if(this.profileForm.valid){
      console.log ("2222222222222222222222")
      if(this.isuploadFile == true && this.selectedFiles){
        console.log("333333333333333333")
        this.upload().then(response =>{
          this.profileLink = response;
          if(this.profileLink){
           this.formvalues()
          }
        });
      }else{
        this.formvalues()
      }

    }
  }

formvalues(){
  this.ngxService.start();
  let data= {
    profile_img:this.profileLink,
    first_name:this.values.firstName.value,
    last_name:this.values.lastName.value,
    email:this.values.emailId.value,
    contact_no:this.values.phoneNumber.value,
    password:"",
    location:""
  };
  if(data.contact_no == this.contactNo){
    this.service.post1(data, 'update_profile').pipe().subscribe(response => {
      this.ngxService.stop();
      if(response.api_status == true){
        this.ngxService.stop();
        localStorage.setItem('name', this.values.firstName.value)
        localStorage.setItem('lname', this.values.lastName.value)
        localStorage.setItem('profileImg', this.profileLink)
        this.toastr.success(response.message);
      }else{
        this.ngxService.stop();
        this.toastr.error(response.message);
      }
    });
  }else{
    this.ngxService.stop();
    document.getElementById('hbtn3').click();
    this.resendCode();
  }
}

/******************** Code for change password ****************/

PasswordSubmit(){
 this.submitted = true;
 if(this.passwordForm.valid){
   if(this.passwordvalue.newPassword.value == this.passwordvalue.confirmPassword.value){
     this.ngxService.start();
     let data = {
      old_password: this.passwordvalue.oldPassword.value,
      password: this.passwordvalue.newPassword.value
     };
     this.service.post1(data, 'change_password').pipe().subscribe(response =>{
       this.ngxService.stop();
       if(response.api_status){
         this.passwordForm.reset();
         this.modalService.dismissAll();
         this.toastr.success(response.message);
         this.router.navigate(['/user/edit'])
       }else{
         this.ngxService.stop();
         this.toastr.error(response.message);
       }
     })
   }else{
    //  this.ngxService.stop();
    //  alert('Password and Confirm Password should be same')
     this.toastr.info('Password and Confirm Password should be same')
   }
 }  
}

/**************************************************************/

/*********** Resend code for contact number change ************/
resendCode(){
  this.ngxService.start();
this.newphoneNumber = this.values.phoneNumber.value
  let data= {
    user_id: this.formId.toString(),
    contact_no:this.newphoneNumber
  };
  this.service.post(data, "send_otp").pipe().subscribe(response => {
    if(response.api_status){
      this.ngxService.stop();
      this.toastr.success(response.message);
      this.startTimer()
    }else{
      this.ngxService.stop();
      this.toastr.error(response.message);
    }
  })
}
/*************************************************************/

/***************** OTP TIMER FUNCTIONALITY *******************/

startTimer() {
  clearInterval(this.interval);
  this.timeLeft= 59;
  this.interval = setInterval(() => {
    if(this.timeLeft > 0) {
      this.timeLeft--;
    } 
  },1000)
}

/***************************************************************/

/********************** Code for Ng Otp ************************/

otp: string;
showOtpComponent = true;
@ViewChild('ngOtpInput,',{static:false}) ngOtpInput: any;
config = {
  allowNumbersOnly: true,
  length: 4,
  isPasswordInput: false,
  disableAutoFocus: false,
  placeholder:'',
  inputStyles: {
    'width': '60px',
    'height': '60px'
  }
};
onOtpChange(otp) {
  this.otp = otp;
  console.log(this.otp)
}

onConfigChange() {
  this.showOtpComponent = false;
  this.otp = null;
  setTimeout(() => {
    this.showOtpComponent = true;
  }, 0);
}

/***************************************************************/

/********************* VERIFY PHONE NUMBER  ********************/
verifyphoneotp(){
  this.ngxService.start();
  this.validationmsg();
    if(!this.optflag){
      this.ngxService.start();
       let data= {
        otp: this.otp,
        phone_no: this.newphoneNumber
  };
  this.service.post1(data, "update_profile_verify_otp").pipe().subscribe(response => {
    if(response.api_status){
      this.ngxService.stop();
      this.contactNo = this.newphoneNumber;
      this.toastr.success(response.message);
      this.router.navigate(['/user/edit'])
       this.modalService.dismissAll();
    }else{
      this.ngxService.stop();
      this.toastr.error(response.message);
    }
  });
}

}

validationmsg() {
  if (!this.otp) {
    this.optflag =true

  } else {
    this.optflag = false;
  }
}

/**************************************************************/
  alphabetOnly(event): boolean {
    if (localStorage.getItem('selectedLanguage') == 'ar') { return true }
    else {
      const charCode = (event.which) ? event.which : event.keyCode;
      if (event.target.value.length > 0 && charCode == 32) {
        return true
      } else if ((charCode >= 65 && charCode <= 90) || (charCode >= 97 && charCode <= 122)) {
        return true;
      } else {
        return false;
      }
    }
  }

  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
    }
}
