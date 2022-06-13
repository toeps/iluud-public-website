import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { MainService } from '../../../Services/main.service'
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-searchworker',
  templateUrl: './searchworker.component.html',
  styleUrls: ['./searchworker.component.scss']
})
export class SearchworkerComponent implements OnInit {

  searchworker: FormGroup;
  submitted: boolean = false;
  latitude: string;
  longitude: string;
  workerlist: any;
  page: number = 1;
  limit: number = 10;

  constructor(private formbuilder: FormBuilder, private router: Router, private service: MainService,
    private ngxService: NgxUiLoaderService, private toastr: ToastrService) { }

  ngOnInit() {

    this.searchworker = this.formbuilder.group({
      search: [""]
    })

    this.latitude = localStorage.getItem('lat')
    this.longitude = localStorage.getItem('lng')
    this.workerSearch();
  }

  get values(){
    return this.searchworker.controls;
  }

  workerSearch(){
    this.submitted = true;
    this.ngxService.start();
    let data= {
      search: this.values.search.value,
      date:"",
      fixed_rate_price: "",
      hour_rate_price: "",
      super_iluuder: "",
      start_time: "",
      end_time: "",
      service_category_ids: "",
      sub_service_category_ids: "",
      service_list_ids: "",
      subscription: "",
      price: "",
      rating: "",
      lat: this.latitude,
      lng: this.longitude,
      page: this.page
    }
    this.service.post1(data, "search").pipe().subscribe(response =>{
      if(response.api_status){
        this.ngxService.stop();
        this.workerlist = response.data.search_result;
      }
      else{
        this.ngxService.stop();
        this.toastr.error(response.message);
      }
    })
  }


  loadPage($event) {
    this.page = $event;
    this.workerlist=[]
    this.workerSearch();
  }
}
