import { Component, OnInit, TemplateRef } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MainService } from '../../../Services/main.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.scss']
})
export class FavoriteComponent implements OnInit {
  key: any = "1";
  searchForm: FormGroup;
  val: number;
  rangeValues: number[] = [0, 100];
  rangeValues1: number[] = [0, 100];

  // reviewCard=[

  //   {
  //     name: "Abc",
  //     city: "Cape Town",
  //     review: "4.7 (35 review)",
  //     profileImage: "assets/images/svg/s-cleaner.svg"
  //   },
  //   {
  //     name: "Abc",
  //     city: "Cape Town",
  //     review: "4.7 (35 review)",
  //     profileImage: "assets/images/svg/s-cleaner.svg"
  //   }, {
  //     name: "Abc",
  //     city: "Cape Town",
  //     review: "4.7 (35 review)",
  //     profileImage: "assets/images/svg/s-cleaner.svg"
  //   }, {
  //     name: "Abc",
  //     city: "Cape Town",
  //     review: "4.7 (35 review)",
  //     profileImage: "assets/images/svg/s-cleaner.svg"
  //   }, {
  //     name: "Abc",
  //     city: "Cape Town",
  //     review: "4.7 (35 review)",
  //     profileImage: "assets/images/svg/s-cleaner.svg"
  //   }, {
  //     name: "Abc",
  //     city: "Cape Town",
  //     review: "4.7 (35 review)",
  //     profileImage: "assets/images/svg/s-cleaner.svg"
  //   }, {
  //     name: "Abc",
  //     city: "Cape Town",
  //     review: "4.7 (35 review)",
  //     profileImage: "assets/images/svg/s-cleaner.svg"
  //   }, {
  //     name: "Abc",
  //     city: "Cape Town",
  //     review: "4.7 (35 review)",
  //     profileImage: "assets/images/svg/s-cleaner.svg"
  //   }, {
  //     name: "Abc",
  //     city: "Cape Town",
  //     review: "4.7 (35 review)",
  //     profileImage: "assets/images/svg/s-cleaner.svg"
  //   }, {
  //     name: "Abc",
  //     city: "Cape Town",
  //     review: "4.7 (35 review)",
  //     profileImage: "assets/images/svg/s-cleaner.svg"
  //   },
  // ]
  favForm: FormGroup
  closeResult: string;
  visibleSidebar2;
  latitude: string;
  longitude: string;
  indoorFav: any;
  outdoorFav: any;
  profeFav: any;
  tradeFav: any;
  FavList: any;
  submitted: boolean = false;
  modalRef: NgbModalRef;
  User_Id: any;
  checkval: any;

  constructor(private modalService: NgbModal, private ngxService: NgxUiLoaderService, 
    private service: MainService, private formbuilder: FormBuilder, private toastr: ToastrService) { }

  ngOnInit() {

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
    })

    this.favForm = this.formbuilder.group({
      favName: ["" ],
      selectFolder: [""] 
    })

    this.latitude = localStorage.getItem('lat');
    this.longitude = localStorage.getItem('lng');
    this.favoriteIndoorlist(this.key);
  }

  openModal(template: TemplateRef<any>, id, ) {
    this.User_Id = id.toString();

    // this.modalService.open( content, { centered: true,  });
    this.modalRef = this.modalService.open(template, {
      centered: true
    });
  }
  openScrollableContent(longContent, popupdata) {
    // this.popupdata = popupdata
    this.modalService.open(longContent, { scrollable: true, windowClass: 'filter-modal' });
    // this.changecat = this.popupdata.name
  }

  get values() {
    return this.searchForm.controls;
  }

  get f(){
    return this.favForm.controls;
  }

  search(){
    this.ngxService.start();
    let data = {
      search: "",
      date:this.values.bookingDate.value,
      fixed_rate_price: "40",
      hour_rate_price: "20",
      super_iluuder: "",
      start_time: this.values.startTime.value,
      end_time: this.values.endTime.value,
      service_category_ids: "",
      sub_service_category_ids: this.values.subCategory.value,
      service_list_ids: this.values.services.value,
      subscription: this.values.iworkerCategory.value,
      price: "",
      rating: this.values.sorting.value,
      lat:"28.5355",
      lng:"77.3910",
      page: 1
    };
    this.service.post1(data, "search").pipe().subscribe(response => {
      if(response.api_status){
        this.ngxService.stop();
        this.searchForm.reset();
        this.toastr.success(response.message);

      }else{
        this.ngxService.stop();
        this.searchForm.reset();
        this.toastr.error(response.message);
      }
    });
  }

  handleChange(e) {
    //e.value is the new value
}

favoriteIndoorlist(status){
  this.ngxService.start();
  let data = {
    lat: this.latitude,
    lng: this.longitude,
    search: "",
    date: "",
    fixed_rate_price: "",
    hour_rate_price: "",
    super_iluuder: "",
    start_time: "",
    end_time: "",
    service_category_ids: status,
    sub_service_category_ids: "",
    service_list_ids: "",
    subscription: "",
    price: "",
    rating: "",
    page: "",
  }
  this.service.post1(data, "favorite_list").pipe().subscribe(response => {
    if(response.api_status){
      this.ngxService.stop();
      this.indoorFav = response.data.favorite_list;
      this.getFavFolderList();
    }else{
      this.ngxService.stop();
      this.toastr.error(response.message);
    }
  })
}

check(status) {
  this.key = status;
  this.favoriteIndoorlist(status);
  // localStorage.setItem('section',status)

}

getFavFolderList() {
  this.ngxService.start();
  this.service
    .get1(`get_fav_folder_list`)
    .pipe()
    .subscribe(response => {
      if (response.api_status) {
        this.ngxService.stop();
        this.FavList = response.data.folder_list;
        // console.log(this.FavList, "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
      } else {
        this.ngxService.stop();
        this.toastr.error(response.message);
      }
    });
}

favFolderSubmit(){
  this.submitted = true;
    this.ngxService.start();
    let data = {
      favorite_id:this.User_Id,
      folder_name: this.f.favName.value 
    }
    this.service.post1(data, "make_folder_mark_favorite").pipe().subscribe(response => {
      if(response.api_status){
        this.ngxService.stop();
        this.modalService.dismissAll();
        this.favForm.reset();
        this.getFavFolderList();
        this.toastr.success(response.message);
      }
      else{
        this.ngxService.stop();
        this.toastr.error(response.message);
      }
    })
}

favFolderDropSubmit(){
  this.submitted = true;
  this.ngxService.start();
  let data= {
    favorite_id: this.User_Id,
    folder_id: this.f.selectFolder.value
  }
  this.service.post1(data, "add_to_fav_folder").pipe().subscribe(response => {
    if(response.api_status){
      this.ngxService.stop();
      this.modalService.dismissAll();
      this.favForm.reset();
      this.getFavFolderList();
      this.toastr.success(response.message);
    }
    else{
      this.ngxService.stop();
      this.toastr.error(response.message);
    }
  })
}

checkvalue(){
  if(this.checkval = this.f.favName.value ){
    this.favForm.get('selectFolder').disable();
console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
  }

}


}
