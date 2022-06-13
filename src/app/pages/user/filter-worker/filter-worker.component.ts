import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MainService } from '../../../Services/main.service';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Router } from '@angular/router';

@Component({
  selector: 'app-filter-worker',
  templateUrl: './filter-worker.component.html',
  styleUrls: ['./filter-worker.component.scss']
})
export class FilterWorkerComponent implements OnInit {

  searchworker: FormGroup;
  submitted: boolean = false;
  latitude: string;
  longitude: string;
  workerlist: any;
  page: number = 1;
  limit: number = 10;
  filterData: any;
  jsonString: string;

  constructor(private formbuilder: FormBuilder, private router: Router, private service: MainService,
    private ngxService: NgxUiLoaderService, private toastr: ToastrService) { }

  ngOnInit() {

    this.searchworker = this.formbuilder.group({
      search: [""]
    })

    this.latitude = localStorage.getItem('lat')
    this.longitude = localStorage.getItem('lng')
    this.jsonString = localStorage.getItem('data')

    this.filterData = JSON.parse(this.jsonString);

    console.log(this.filterData, "qwertyuiopasdfghjklzxcvbnm")
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
      date: this.filterData.date,
      fixed_rate_price: this.filterData.fixed_rate_price,
      hour_rate_price: this.filterData.hour_rate_price,
      super_iluuder: this.filterData.super_iluuder,
      start_time: this.filterData.start_time,
      end_time: this.filterData.end_time,
      service_category_ids: this.filterData.service_category_ids,
      sub_service_category_ids: this.filterData.sub_service_category_ids,
      service_list_ids: this.filterData.service_list_ids,
      subscription: this.filterData.subscription,
      price: this.filterData.price,
      rating: this.filterData.rating,
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
