import { Component, OnInit,ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from "angularx-social-login";
import { FacebookLoginProvider, GoogleLoginProvider } from "angularx-social-login";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { MainService } from '../../Services/main.service';
import { StorageService } from '../../Services/storage.service';
import { UploadService } from '../../Services/upload.service';
import { timer } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

export interface IFileNameS3 {
  Bucket: string;
  Key: string;
  Location: string;
  key: string;
}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  closeResult: string;
  visibleSidebar2: boolean = false;
  clicked: boolean = false;
  signUpForm : FormGroup;
  loginForm : FormGroup;
  forgotForm: FormGroup;
  confirmPassForm: FormGroup;

  submitted: boolean = false;
  showErrorMsg: boolean = false;
  showSuccessMsg: boolean = false;
  editable: boolean = false;
  optflag:boolean = false;

  // currenturl: string;
  showErrorMsg1: boolean;
  msg: any;
  loginMsg: any;
  selectedFiles: any;
  isuploadFile: boolean = false;
  profileLink: any;
  resetMsg: any;
  timeLeft: any;
  interval: any;
  sinupData: any;
  forgotData:any;
  contentEditable: boolean;
  longitude: any;
  latitude: any;
  socialType: any;
  socialId: string;
  checktoken: string;
  socialDetails: any;

  constructor(private modalService: NgbModal, private service: MainService, private route: ActivatedRoute,
    private router: Router, private ngxService: NgxUiLoaderService, private storageService: StorageService, private uploadservice: UploadService,
    private authService: AuthService,  private formBuilder: FormBuilder, private toastr: ToastrService) {
      
      if(this.storageService.getItem('acesstoken')){
        this.router.navigate(['/']);
      }
    }

  ngOnInit() {
    this.signUpForm = this.formBuilder.group({
      firstName: ["", [Validators.required, Validators.maxLength(15)]  ],
      lastName: ["", [Validators.required, Validators.maxLength(15)]],
      emailId: ["", [Validators.required, Validators.maxLength(30), Validators.pattern(/^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-])+\.([A-Za-z]{2,6})$/)]],
      phoneNumber: ["", [Validators.required, Validators.minLength(6), Validators.maxLength(15)]],
      password: ["", [Validators.required, Validators.minLength(6), Validators.maxLength(15), Validators.pattern(/^[\S]*$/)]],
      confirmPassword: ["", [Validators.required, Validators.minLength(6), Validators.maxLength(15), Validators.pattern(/^[\S]*$/)]],
      checked: [""]
    })

    this.loginForm = this.formBuilder.group({
      EmailId: ["", [Validators.required, Validators.maxLength(30), Validators.pattern(/^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-])+\.([A-Za-z]{2,6})$/)]],
      password: ["", [Validators.required, Validators.minLength(6), Validators.maxLength(15), Validators.pattern(/^[\S]*$/)]],
    })

    this.authService.authState.subscribe((user) => {
      if (this.clicked == true) {
        this.socialDetails = user;
        this.socialType = user.provider;
        this.socialId = user.id;
        this.checkEmail();
        console.log(user, "sssssssssssssssssssss")
      }
    });
    
    this.forgotForm = this.formBuilder.group({
      emailAddress: ["", [Validators.required, Validators.maxLength(30), Validators.pattern(/^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-])+\.([A-Za-z]{2,6})$/)]]
    });

    this.confirmPassForm = this.formBuilder.group({
      newPassword: ["", [Validators.required, Validators.minLength(6), Validators.maxLength(15), Validators.pattern(/^[\S]*$/)]],
      confirmPassword: ["", [Validators.required, Validators.minLength(6), Validators.maxLength(15), Validators.pattern(/^[\S]*$/)]],
    });


    this.checktoken = localStorage.getItem('token');
    console.log(this.checktoken, "4444444444455555555555555555555555556666666666666")
  }

  openModal(modalname, className) {
    this.contentEditable = false;
    this.loginForm.reset();
    this.signUpForm.reset();
    this.profileLink = '';
    this.submitted = false;
    this.modalService.dismissAll();
    this.modalService.open(modalname, { centered: true, windowClass: className });
  }


  navigate(route) {
    this.visibleSidebar2 = false
    this.router.navigate([route])
  }


  get values() {
    return this.signUpForm.controls;
  }

  get loginvalue(){
    return this.loginForm.controls
  }

  get forgotvalue(){
     return this.forgotForm.controls
  }

  get confirmpassvalue(){
    return this.confirmPassForm.controls
  }

  toggleEditable(event) {
    if ( event.target.checked ) {
        this.contentEditable = true;
        console.log("111111111111111111111111111111111")
   }else{
     this.contentEditable = false;
   }
}

  submit(){
    this.submitted = true;
    if(this.signUpForm.valid){
      if(this.isuploadFile == true && this.selectedFiles){
        this.upload().then(response => {
          this.profileLink = response;
          if(this.profileLink){
      if (this.values.password.value === this.values.confirmPassword.value){
        if(this.contentEditable == true){
        this.ngxService.start();
        let data = {
          first_name: this.values.firstName.value,
          last_name: this.values.lastName.value,
          email: this.values.emailId.value,
          contact_no: this.values.phoneNumber.value,
          password: this.values.password.value,
          profile_img: this.profileLink,
          user_type: "user",
          social_type:"",
          social_id:""
        };
        this.service.post(data, "register").pipe()
          .subscribe(response =>{
            this.ngxService.stop();
            if(response.api_status == false){
              this.toastr.error(response.message);
              // this.showErrorMsg = true;
              // this.msg = response.message
              // setTimeout(() => {
              //   this.showErrorMsg = false
              // }, 3000);
            }else if (response.api_status){
              this.signUpForm.reset()
              this.modalService.dismissAll()
              this.toastr.success(response.message);
              this.msg = "You have signed up successfully.";
              this.sinupData = response.data.user_details;
              console.log(this.sinupData)
                this.showSuccessMsg = true;    
                localStorage.setItem('email', response.data.user_details.email)
                sessionStorage.setItem("email", response.data.user_details.email);
                this.resendCode();
                document.getElementById('hbtn').click();
                setTimeout(() => {
                  this.showSuccessMsg = false;
                }, 2000);
            }
            }
        );
        }else{
          // alert("Please check terms and condition by Iluud")
          this.toastr.info('Please check terms and condition by Iluud')
        }
      } else{
      // this.showErrorMsg = true;
      // alert("Password and confirm password should be same.")
      this.toastr.info('Password and confirm password should be same.')
      // setTimeout(() => {
      //   this.showErrorMsg = false
      // }, 3000);
    }
  }
});
}
  }
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
        reader.onload = e => (this.profileLink = reader.result);
        reader.readAsDataURL(file);
      } else {
        // this.toaster.error("File is not Valid .");
        alert("File is not valid");
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

loginSubmit(){
  this.submitted = true;
  if (this.loginForm.valid) {
    if(this.contentEditable == true){
      this.ngxService.start();
      let data= {
        email: this.loginvalue.EmailId.value,
        password: this.loginvalue.password.value,
        user_type: "user"
      };
      this.service.post(data, "login").pipe()
      .subscribe( response => {
          this.ngxService.stop();


          if (response.api_status == false) {
            this.toastr.error(response.message);
            // this.loginMsg = response.message;
            // this.showErrorMsg1 = true;
            // setTimeout(() => {
            //   this.showErrorMsg1 = false;
            // }, 3000);
          } else if (response.api_status) {
            this.loginForm.reset()
              this.modalService.dismissAll()
              this.toastr.success(response.message);
            localStorage.setItem('email', response.data.user_details.email)
            localStorage.setItem('name', response.data.user_details.first_name)
            localStorage.setItem('lname', response.data.user_details.last_name)
            localStorage.setItem('profileImg', response.data.user_details.profile_img)
            localStorage.setItem('telephone', response.data.user_details.contact);
            localStorage.setItem('id', response.data.user_details.id);
            localStorage.setItem("userAccessToken", response.data.token);

            sessionStorage.setItem("email", response.data.user_details.email);
            this.storageService.setItem('telephone', response.data.user_details.contact)
            sessionStorage.setItem("userAccessToken", response.data.token);
            sessionStorage.setItem("isLoggedIn", JSON.stringify(true));
            this.storageService.setItem('isLoggedIn', JSON.stringify(true))
            this.storageService.setItem('name', response.data.user_details.first_name)
            this.service.getPosition().then(pos=>
                {
                   console.log(`Positon: ${pos.lng} ${pos.lat}`);
                   this.longitude= pos.lng
                   this.latitude=pos.lat
                   console.log(this.longitude, this.latitude, "sssssssssssssssssssssssssssss")
                   localStorage.setItem('lat', this.latitude);
                   localStorage.setItem('lng', this.longitude)
                });
              //   console.log(this.longitude, this.latitude, "2323swdwedweuhweuhwebd")
              //   localStorage.setItem('lat', this.latitude);
              //   localStorage.setItem('lng', this.longitude)
              // console.log(this.latitude, "333333333333333333")
              localStorage.setItem('lat', "28.6121074")
              localStorage.setItem('lng', "77.3364759")
            this.router.navigate(['/user']);
          }
        }
      );  
    }  else{
      this.toastr.info('please check keep me login')
      // alert("please check keep me login")
    }
  }
}

/****************Social Login Code ***************/

checkEmail() {
  this.ngxService.start();
  let data = {
    social_type: this.socialType,
    social_id: this.socialId,
    user_type:"iUser"
  };
  this.service.post(data, "social_login").pipe()
  .subscribe(response => {
    this.ngxService.stop();
    if (response.api_status == false) {
      // sessionStorage.setItem('userEmail', user.email);
      // sessionStorage.setItem('userName', user.name);
      // sessionStorage.setItem('socialLogin', JSON.stringify(true));
      // this.router.navigate(['/auth/signup']);

    } else if (response.api_status) {
       localStorage.setItem('email', this.socialDetails.email)
            localStorage.setItem('name', this.socialDetails.firstName)
            localStorage.setItem('lname', this.socialDetails.lastName)
            localStorage.setItem('profileImg', this.socialDetails.photoUrl)
            localStorage.setItem('telephone', "");
            localStorage.setItem('id', this.socialDetails.email);
            localStorage.setItem("userAccessToken", this.socialDetails.idToken);

      // localStorage.setItem('email', response.result.email)
      // localStorage.setItem('name', response.response.firstName)
      // sessionStorage.setItem("email", response.response.email);
      // sessionStorage.setItem("userAccessToken", response.result.token);
      // localStorage.setItem("userAccessToken", response.result.token);
      // sessionStorage.setItem("isLoggedIn", JSON.stringify(true));
      // this.storageService.setItem('isLoggedIn', JSON.stringify(true))
      // this.router.navigate(['/pages/home'], { relativeTo: this.route });
    }
  });
}

signInWithGoogle(): void {
  this.clicked = true
  this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
}

signInWithFB(): void {
  this.clicked = true
  this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
}

/********************** Code ends ********************************/


confirmPassSubmit(){
  this.submitted = true;
  if(this.confirmPassForm.valid){
    if(this.confirmpassvalue.newPassword.value == this.confirmpassvalue.confirmPassword.value){
       this.ngxService.start();
       let data = {
        user_id: this.forgotData.id.toString(),
        password:this.confirmpassvalue.newPassword.value
       };
       this.service.post(data, "update_password").pipe()
       .subscribe(response => {
         this.ngxService.stop();
         if(response.api_status == false){
           this.toastr.error(response.message);
          //  this.showErrorMsg1 = true;
          //  this.resetMsg = response.result.message;
          //  setTimeout(() =>{
          //    this.showErrorMsg1 = false;
          //  }, 4000);
         }
         else if(response.api_status) {
          //  console.log("vvvvvvvvvvvvvvvvvvvvvvvvvvvvv")
          //  this.resetMsg = "Password reset successfull, please login to continue."
           this.toastr.success(response.message);
           this.showErrorMsg = true;
           this.modalService.dismissAll()
           this.confirmPassForm.reset()
           localStorage.clear();
           setTimeout(()=>{
             this.showSuccessMsg = false;
             this.router.navigate(['/home'])
            // console.log("12345678")
           }, 2000);
         }
       });
    } else {
      this.showErrorMsg1 = true
      // alert("New and confirm password should be same.")
      this.toastr.info('New and confirm password should be same.')
      setTimeout(() => {
        this.showErrorMsg1 = false
      }, 4000);
    }
  }
}

forgotSubmit(){
  this.submitted = true;
  if(this.forgotForm.valid){
  
    this.ngxService.start();
    let data = { 
      email_or_contact: this.forgotvalue.emailAddress.value
    };
      this.service.post(data,'forget_password_otp').pipe().subscribe(response=>{
        if(response.api_status){
          this.ngxService.stop();
          this.forgotData = response.data.user_details;
          // console.log(this.forgotData, "ddddddddddddddddddddddddddddd")
           document.getElementById('hbtn1').click();
           this.startTimer()
           this.forgotForm.reset()
           this.toastr.success(response.message);
        }else{
          this.ngxService.stop();
          this.toastr.error(response.message);
        }
      });
  }
}
/************* Resend code for signup   ****************/
resendCode(){
  this.ngxService.start();

  let data= {
    user_id: this.sinupData.id.toString(),
    contact_no:this.sinupData.contact
  };
  this.service.post(data, "send_otp").pipe().subscribe(response => {
    if(response.api_status){
      this.ngxService.stop();
      this.startTimer()
      this.toastr.success(response.message);
    }else{
      this.ngxService.stop();
      this.toastr.error(response.message);
    }
  })
}
/********************  Resend code finishes here ********************/

/************* Resend code for forgot password   ****************/

resendpassword(){
  this.ngxService.start();

  let data= {
    user_id: this.forgotData.id.toString(),
    contact_no:this.forgotData.contact
  };
  this.service.post(data, "send_otp").pipe().subscribe(response => {
    if(response.api_status){
      this.ngxService.stop();
      this.startTimer();
      this.toastr.success(response.message);
    }else{
      this.ngxService.stop();
      this.toastr.error(response.message);
    }
  })
}

/********************  Resend code finishes here ********************/

  alphaNumericOnly(event): boolean {
    if (localStorage.getItem("selectedLanguage") == "ar") {
      return true;
    } else {
      const charCode = event.which ? event.which : event.keyCode;
      console.log(charCode);
      if (event.target.value.length > 0 && charCode == 32) {
        return true;
      } else if (
        (charCode >= 65 && charCode <= 90) ||
        (charCode >= 97 && charCode <= 122)
      ) {
        return true;
      } else if (charCode >= 48 && charCode <= 57) {
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


/**********************************Code for Ng Otp *********************************************************** */

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

/******************************End code of angular otp ************************************************************ */

verifyotp(){
    this.validationmsg();
    if(!this.optflag){
      this.ngxService.start();
       let data= {
      user_id: this.sinupData.id.toString(),
      otp: this.otp
  };
  this.service.post(data, "verify_otp").pipe().subscribe(response => {
    if(response.api_status){
      this.ngxService.stop();
      // document.getElementById('hbtn1').click();
       this.modalService.dismissAll();
       this.toastr.success(response.message);
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


verifyforgototp(){
  this.validationmsg();
  if(! this.optflag){
    this.ngxService.start();
    let data={
      user_id: this.forgotData.id.toString(),
      otp: this.otp
    };
    this.service.post(data, 'verify_forget_password_otp').pipe().subscribe(response => {
      if(response.api_status){
        this.ngxService.stop()
        document.getElementById('hbtn2').click();
        this.startTimer()
        // this.modalService.dismissAll();
        this.toastr.success(response.message);
      }else{
        this.ngxService.stop();
        this.toastr.error(response.message)
      }
    });
  }
}
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



/**************OTP TIMER FUNCTIONALITY ENDS*******************/
 


}
