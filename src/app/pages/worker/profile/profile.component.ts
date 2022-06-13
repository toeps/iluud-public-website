import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { MainService } from '../../../Services/main.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  // profileData = {
  //   "image": "assets/images/png/profile.png", "name": "John Jones", "rating": "4.7", "desc": `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
  //           industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and
  //           scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap`, "rate": "35", "subCategory": `Kitchen Cleaning, Household, AC Service...`, "startHours": "08:00 AM", "endHours": "10:00 PM", "exp": "3.5"
  // }
  // reviews = [
  //   {
  //     "image": "assets/images/png/profile.png", "name": "Nina Jones", "date": "05 Aug 2015", "rating": "4.7", "desc": `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
  //               industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and
  //               scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap`, "uploadedImages": "assets/images/png/Indoor-domestic.png"
  //   },
  //   {
  //     "image": "", "name": "Rina Jones", "date": "06 Aug 2015", "rating": "4.7", "desc": `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
  //   industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and
  //   scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap` , "uploadedImages": "assets/images/png/Indoor-domestic.png"
  //   },
  //   {
  //     "image": "", "name": "Lina Jones", "date": "07 Aug 2015", "rating": "4.7", "desc": `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
  //   industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and
  //   scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap`, "uploadedImages": "assets/images/png/Indoor-domestic.png"
  //   },
  //   {
  //     "image": "", "name": "Lina Jones", "date": "07 Aug 2015", "rating": "4.7", "desc": `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
  //   industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and
  //   scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap`, "uploadedImages": "assets/images/png/Indoor-domestic.png"
  //   }

  // ]
  order: any;
  workerdata: any;
  reviewdata: any;
  rate: any;
  fav: any;
  flag1: number;
  constructor(private route: ActivatedRoute, private ngxservice: NgxUiLoaderService,
    private router: Router, private service:MainService, private toastr: ToastrService) { }

  ngOnInit() {

  /****************** Getting id of worker by queryparams ********/
    this.route.queryParams.pipe(
      filter(params => params.id))
      .subscribe(params => {
        console.log(params); // {order: "popular"}

        this.order = params.id;
        console.log(this.order); // popular
      });

  /***********code ends here ******************/
  this.workerdetails();
  }
  


  workerdetails(){
    this.ngxservice.start();
    let data = {
      worker_id : this.order
    }
    this.service.post1(data, "worker_details").pipe().subscribe(response => {
      if(response.api_status){
        this.ngxservice.stop();
        this.workerdata = response.data.user_details;
        this.reviewdata = response.data.review_list;
        this.rate = response.data.user_details.rate
        this.fav = response.data.user_details.is_fav;
        // console.log(this.fav, "22222222222222222222222222222222222")
      }
      else{  
        this.ngxservice.stop();
        this.toastr.error(response.message);
      }
    });
  }

  favourate(){
    this.ngxservice.start();
    let data = {
      favorite_id: this.order,
      type: this.flag1,
    };
    this.service.post1(data, "mark_favorite").pipe().subscribe(response => {
      if(response.api_status){
        this.ngxservice.stop();
        this.toastr.success(response.message);
      }else{
        this.ngxservice.stop();
        this.toastr.error(response.message);
      }
    })
  }


  check(){
   if(this.fav == 0)
   {
     this.flag1 = 1;
     console.log( this.flag1 , '3333333333333333333333333333333333333')
     this.favourate();
     this.workerdetails();
   }
   else if(this.fav == 1)
   {
     this.flag1 = 0;
     console.log( this.flag1, '444444444444444444444444444444444444444')
     this.favourate();
     this.workerdetails();

   }  
  }

  workerId(){
    localStorage.setItem('WorkerId', this.order);
    this.router.navigate(['/service'])
  }
}
