import { Component, OnInit } from '@angular/core';
import { MainService } from '../../../Services/main.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-terms',
  templateUrl: './terms.component.html',
  styleUrls: ['./terms.component.scss']
})
export class TermsComponent implements OnInit {
  list: any;

  constructor(private service: MainService,  private ngxService: NgxUiLoaderService, private toastr: ToastrService) { }

  ngOnInit() {
    this.getdata();  
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
          this.list = response.data.config;
          console.log(this.list, "qwertyuiopasdfghjkl")
     
        } else {
          this.ngxService.stop();
          this.toastr.error(response.message);
        }
      });
  }

}
