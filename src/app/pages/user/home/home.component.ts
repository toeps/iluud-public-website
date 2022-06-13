import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ActivatedRoute, Router } from '@angular/router';
// import { StorageService } from 'src/app/Services/storage.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MainService } from '../../../Services/main.service';
import { ToastrService } from 'ngx-toastr';

@Component({   
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.None,

})
export class HomeComponent implements OnInit {
  
  rangeValues: number[] = [0, 100];
  rangeValues1: number;
  MyModal = 0;
  dropdownList = [];
  selectedItems = [];
  dropdownSettings: IDropdownSettings = {};
  val: number;

  // workerList = [
  //   { "image": "assets/images/png/profile.png", "name": "John Miller", "town": "Cape Town, US", "rating": "4.7", "reviews": "35" },
  //   { "image": "assets/images/png/profile.png", "name": "Josh Miller", "town": "Cape Town, NY", "rating": "4.2", "reviews": "13" },
  //   { "image": "assets/images/png/profile.png", "name": "Garry Miller", "town": "Cape Town, UK", "rating": "4.5", "reviews": "15" },
  //   { "image": "assets/images/png/profile.png", "name": "Garry Miller", "town": "Cape Town, UK", "rating": "4.5", "reviews": "15" },
  //   { "image": "assets/images/png/profile.png", "name": "Garry Miller", "town": "Cape Town, UK", "rating": "4.5", "reviews": "15" },
  //   { "image": "assets/images/png/profile.png", "name": "Garry Miller", "town": "Cape Town, UK", "rating": "4.5", "reviews": "15" },
  // ]
  list: any;
  myname: string;
  category: any;
  locationService: any;
  longitude: any;
  latitude: any;
  worker: any;
  subcategory: any;
  servicelist: any;
  searchForm: FormGroup;
  time = {hour: 13, minute: 30};
  meridian = true;
  changecat: any;
  checkservice: number;

  toggleMeridian() {
      this.meridian = !this.meridian;
  }

  time1 = {hour: 13, minute: 30};
  meridian1 = true;

  toggleMeridian1() {
      this.meridian1 = !this.meridian1;
  }
  constructor(private modalService: NgbModal, private formbuilder: FormBuilder,private toastr: ToastrService,
    private service: MainService, private ngxService: NgxUiLoaderService, private route: ActivatedRoute,
    private router: Router) { 
      //  this.service.getPosition().then(pos=>
      //   {
      //      console.log(`Positon: ${pos.lng} ${pos.lat}`);
      //      this.longitude= pos.lng
      //      this.latitude=pos.lat
      //      console.log(this.longitude, this.latitude, "sssssssssssssssssssssssssssss")
      //   });
    }

  ngOnInit() {
    // this.dropdownList = [
    //   { item_id: 1, item_text: 'Mumbai' },
    //   { item_id: 2, item_text: 'Bangaluru' },
    //   { item_id: 3, item_text: 'Pune' },
    //   { item_id: 4, item_text: 'Navsari' },
    //   { item_id: 5, item_text: 'New Delhi' }
    // ];
    // this.selectedItems = [
    //   { item_id: 3, item_text: 'Pune' },
    //   { item_id: 4, item_text: 'Navsari' }
    // ];
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'service_name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 2,
      allowSearchFilter: true
    };

    this.getdata();
    this.dashboard();

    this.searchForm = this.formbuilder.group({
      category: [""],
      subCategory: [""],
      services: [""],
      hourRate: [""],
      fixedRate: [""],
      bookingDate: [""],
      startTime: [""],
      endTime: [""],
      iworkerCategory: [""],
      sorting: [""],
      // category: ["", [Validators.required]],

    })
  }

  get values() {
    return this.searchForm.controls;
  }

  onItemSelect(item: any) {
    console.log(item);
  }
  onSelectAll(items: any) {
    console.log(items);
  }
  popupdata: any={};
  openScrollableContent(longContent, popupdata) {
    this.searchForm.reset();  
    this.val = 0;
    this.rangeValues1 = 0;
    this.popupdata = popupdata
    this.modalService.open(longContent, { scrollable: true, windowClass: 'filter-modal' });
    this.changecat = this.popupdata.name
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
          this.list = response.data;
          // this.category= response.data.service_category_list;
         this.myname = localStorage.getItem('name');
          // console.log(this.myname)
          this.subcategory = response.data.sub_service_category;
          this.servicelist = response.data.service_list;
          localStorage.setItem('flatfeeuser', response.data.flat_fee_user)
          localStorage.setItem('percentagefeeuser', response.data.percentage_fee_user)
          console.log(this.subcategory ,"wwwwwwwwwwwwwwwwww", this.servicelist, "dddddddddddddddddddddd")
        } else {
          this.ngxService.stop();
          this.list=[];
          this.toastr.error(response.message);
        }
      });
  }

  dashboard(){
   this.latitude = localStorage.getItem('lat');
    this.longitude = localStorage.getItem('lng')
    this.ngxService.start();
    let data={
      lat: this.latitude,
      lng: this.longitude
    }
    this.service.post1(data, "dashboard").pipe().subscribe(response => {
      if(response.api_status){
        this.ngxService.stop();
        this.category = response.data.service_category_list;
        this.worker = response.data.workers
        console.log(this.worker)
      }else{
        this.ngxService.stop();
        this.toastr.error(response.message)
      }
    })
  }

  check(changecat){
    console.log('222222222222222222222222222222222222222222222222222222222', this.changecat)
    
    if(changecat == 'Indoor'){
      this.checkservice = 1
      console.log('11111111111111111111111111111111111111111111', this.checkservice)
      return this.checkservice
    }
    else if(changecat == 'Outdoor'){
      this.checkservice = 2
     console.log('222222222222222222222222222222222222222222222', this.checkservice)
      return this.checkservice
    }
    else if(changecat == 'Trade'){
      this.checkservice = 3
      console.log('3333333333333333333333333333333333333333333333', this.checkservice)
      return this.checkservice
    }
    else if(changecat == 'Professional'){
      console.log('444444444444444444444444444444444444444444444', this.checkservice)
      this.checkservice = 4
      return this.checkservice
    }
  }
  
  search(){
    this.check(this.changecat);
    this.ngxService.start();
    let data = {
      search: "",
      date:this.values.bookingDate.value,
      fixed_rate_price: this.values.fixedRate.value,
      hour_rate_price: this.values.hourRate.value,
      super_iluuder: "",
      start_time: this.values.startTime.value,
      end_time: this.values.endTime.value,
      service_category_ids: this.checkservice,
      sub_service_category_ids: this.values.subCategory.value,
      service_list_ids: this.values.services.value,
      subscription: this.values.iworkerCategory.value,
      price: "",
      rating: this.values.sorting.value,
      lat:"28.5355",
      lng:"77.3910",
      page: 1
    };
    localStorage.setItem( "data" , JSON.stringify(data))
    // this.service.post1(data, "search").pipe().subscribe(response => {
    //   if(response.api_status){
    //     this.ngxService.stop();
    //     this.searchForm.reset();
        this.modalService.dismissAll();
    //     this.toastr.success(response.message);
        this.router.navigate(['/user/filter'])

    //   }else{
    //     this.ngxService.stop();
    //     this.searchForm.reset();
    //     this.toastr.error(response.message);
    //   }
    // });
  }


  handleChange(e) {
    //e.value is the new value
}
}

