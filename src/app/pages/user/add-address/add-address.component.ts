import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
// import { StorageService } from 'src/app/Services/storage.service';
import { MainService } from '../../../Services/main.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-address',
  templateUrl: './add-address.component.html',
  styleUrls: ['./add-address.component.scss']
})
export class AddAddressComponent implements OnInit {

  addressForm : FormGroup;
  officeForm : FormGroup;
  otherForm: FormGroup;

  submitted: boolean = false;
  latitude: string;
  longitude: string;
  cityName: string;
  
  constructor(private formbuilder: FormBuilder, private router: Router, private service: MainService,
    private ngxService: NgxUiLoaderService, private toastr: ToastrService) { }

  ngOnInit() {
    this.addressForm = this.formbuilder.group({
      appartment: ["", [Validators.required, Validators.maxLength(30)]],
      streetAddress: ["", [Validators.required, Validators.maxLength(30)]],
      suburb: ["", [Validators.required, Validators.maxLength(30)]],
      city: ["", [Validators.required, Validators.maxLength(30)]]
    })

    this.officeForm = this.formbuilder.group({
      officeAppartment: ["", [Validators.required, Validators.maxLength(30)]],
      officeStreetAddress: ["", [Validators.required, Validators.maxLength(30)]],
      officeSuburb: ["", [Validators.required, Validators.maxLength(30)]],
      officeCity: ["", [Validators.required, Validators.maxLength(30)]]
    })

    this.otherForm = this.formbuilder.group({
      other: ["" , [Validators.required, Validators.maxLength(30)]],
      otherAppartment: ["", [Validators.required, Validators.maxLength(30)]],
      otherStreetAddress: ["", [Validators.required, Validators.maxLength(30)]],
      otherSuburb: ["", [Validators.required, Validators.maxLength(30)]],
      otherCity: ["", [Validators.required, Validators.maxLength(30)]]
    })

    this.latitude = localStorage.getItem('lat')
    this.longitude = localStorage.getItem('lng')
    this.cityName = localStorage.getItem('cityName')
    console.log(this.cityName, "$$$$$$$$$$$$$$$$$$$$$$$$$$")

    this.setValue();
  }

  get values(){
    return this.addressForm.controls 
  }
  get officeValue(){
    return this.officeForm.controls;
  }
  get otherValue(){
    return this.otherForm.controls;
  }

  addressSubmit(){
    this.submitted = true; 
    if(this.addressForm.valid){
      this.ngxService.start();
      let data= {
        type: "home",
        other_type: "home",
        building:this.values.appartment.value,
        street: this.values.streetAddress.value,
        suburb: this.values.suburb.value,
        city: this.values.city.value,
        lat: this.latitude ,
        lng: this.longitude,
        address_id:"",
      }
      this.service.post1(data , "add_update_address").pipe().subscribe(response => {
        if(response.api_status){
          this.ngxService.stop();
          this.submitted = false;
          this.addressForm.reset();
          this.toastr.success(response.message);
          this.router.navigate(['/user/search'])
        }else{
          this.ngxService.stop();
          this.toastr.error(response.message);
        }
      });
    }
    else{
      // alert("Form is not Valid")
      this.toastr.info('Form is not Valid')
    }
  }

  officeSubmit(){
    this.submitted = true; 
    if(this.officeForm.valid){
      this.ngxService.start();
      let data= {
        type: "office",
        other_type: "office",
        building:this.officeValue.officeAppartment.value,
        street: this.officeValue.officeStreetAddress.value,
        suburb: this.officeValue.officeSuburb.value,
        city: this.officeValue.officeCity.value,
        lat: this.latitude ,
        lng: this.longitude,
        address_id:"",
      }
      this.service.post1(data , "add_update_address").pipe().subscribe(response => {
        if(response.api_status){
          this.ngxService.stop();
          this.submitted = false;
          this.officeForm.reset();
          this.toastr.success(response.message);
          this.router.navigate(['/user/search'])
        }else{
          this.ngxService.stop();
          this.toastr.error(response.message);
        }
      });
    }
    else{
      // alert("Form is not Valid")
      this.toastr.info('Form is not Valid')
    }
  }

  otherSubmit(){
    this.submitted = true; 
    if(this.otherForm.valid){
      this.ngxService.start();
      let data= {
        type: "other",
        other_type: this.otherValue.other.value,
        building:this.otherValue.otherAppartment.value,
        street: this.otherValue.otherStreetAddress.value,
        suburb: this.otherValue.otherSuburb.value,
        city: this.otherValue.otherCity.value,
        lat: this.latitude ,
        lng: this.longitude,
        address_id:"",
      }
      this.service.post1(data , "add_update_address").pipe().subscribe(response => {
        if(response.api_status){
          this.ngxService.stop();
          this.submitted = false;
          this.otherForm.reset();
          this.toastr.success(response.message);
          this.router.navigate(['/user/search'])
        }else{
          this.ngxService.stop();
          this.toastr.error(response.message);
        }
      });
    }
    else{
      // alert("Form is not Valid")
      this.toastr.info('Form is not Valid')
    }
  }

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

  check(status) {
    if(status == 'home'){
      console.log('11111111111111111111111111111')
      this.addressSubmit();
    }
   else if(status == 'office'){
    console.log('2222222222222222222222222222222')
     this.officeSubmit();
    } 
    else {
      console.log('33333333333333333333333333333')
      this.otherSubmit();
    } 
  }

  setValue() {
    this.addressForm.patchValue({
      city: this.cityName,
    });
    this.officeForm.patchValue({
      officeCity: this.cityName,
    });
    this.otherForm.patchValue({
      otherCity: this.cityName,
    });
  }

}
