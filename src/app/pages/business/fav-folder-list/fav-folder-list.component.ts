import { Component, OnInit } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { MainService } from '../../../Services/main.service';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-fav-folder-list',
  templateUrl: './fav-folder-list.component.html',
  styleUrls: ['./fav-folder-list.component.scss']
})
export class FavFolderListComponent implements OnInit {
  list: any;
  folder_id: any;

  constructor(private ngxService: NgxUiLoaderService, private toastr: ToastrService,
    private service: MainService, private route: ActivatedRoute ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(resp => {
      this.folder_id = resp.id;
      // localStorage.setItem('page', resp.page)
    });

    this.getFolderList();

  }



  getFolderList(){
    this.ngxService.start();
    let data= {
      folder_id: this.folder_id
    }
    this.service.post1(data, "user_folder_fav_listing").pipe()
      .subscribe(response => {
        if(response.api_status){
          this.ngxService.stop();
          this.list = response.data.favorite_list;         
        }
        else {
          this.ngxService.stop();
          this.toastr.error(response.message);
        }
    })
  }

}
