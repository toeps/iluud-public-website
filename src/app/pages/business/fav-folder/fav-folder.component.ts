import { Component, OnInit, TemplateRef } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MainService } from '../../../Services/main.service';
import { ExportToCsv } from "export-to-csv";
import { ToastrService } from 'ngx-toastr';

const options = {
  fieldSeparator: ",",
  quoteStrings: '"',   
  decimalSeparator: ".",
  showLabels: true,
  showTitle: true,
  title: "Favourite Folder List",
  useTextFile: false,
  useBom: true,
  useKeysAsHeaders: true,
  filename:"Favourite List"
};

const csvExporter = new ExportToCsv(options);

@Component({
  selector: 'app-fav-folder',
  templateUrl: './fav-folder.component.html',
  styleUrls: ['./fav-folder.component.scss']
})
export class FavFolderComponent implements OnInit {

  exportedData: any;
  list: any;
  searching: FormGroup;
  searchString = "";
  page: number = 1;
  numberOfRecords: FormGroup;
  limit: number = 10;
  folderForm: FormGroup;
  totalItems: any;
  Folder_Id: any;
  modalRef: NgbModalRef;

  constructor(private modalService: NgbModal, private ngxService: NgxUiLoaderService, private toastr: ToastrService,
    private service: MainService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.searching = this.formBuilder.group({
      searchstring: [""]
    });
    this.numberOfRecords = this.formBuilder.group({
      display: [""]
    });

    this.folderForm = this.formBuilder.group({
      favName: ["", [Validators.required, Validators.maxLength(30)]],
    })

    this.getFolderList()
  }
  
  // openModal(content) {
  //   this.modalService.open( content, { centered: true,  });
  // }

  openModal(template: TemplateRef<any>, id, ) {
    this.Folder_Id = id.toString();

    // this.modalService.open( content, { centered: true,  });
    this.modalRef = this.modalService.open(template, {
      centered: true
    });
  }
  // folderDetails = [
  //   {
  //     "name": "Folder 1", "members": "10"
  //   },
  //   {
  //     "name": "Folder 2", "members": "20"
  //   },
  //   {
  //     "name": "Folder 3", "members": "40"
  //   }
  // ]

  getFolderList(){
    this.ngxService.start();
    let data= {
      page_no: this.page,
      requested_count: this.limit,
      search_value: this.searchString
    }
    this.service
     .post1(data, "user_folder_listing").pipe()
      .subscribe(response => {
        if(response.api_status){
          this.ngxService.stop();
          this.list = response.data.folder_list;
          this.totalItems = response.data.total_count
        }
        else {
          this.ngxService.stop();
          this.toastr.error(response.message);
        }
    })
  }

  loadPage($event) {
    this.page = $event;
    this.list=[]
    this.getFolderList();
  }

  search(event) {
    this.page = 1;
    this.searchString = event;
    this.getFolderList();
  }

  onChange(display) {
    this.limit = display;
    this.page = 1;
    this.getFolderList();
  }


  DeleteFavFolder(){
    this.ngxService.start();
    let data= {
      folder_id: this.Folder_Id
    }
    this.service.post1(data, "delete_fav_folder").pipe().subscribe(response => {
      if(response.api_status){
        this.ngxService.stop();
        this.modalService.dismissAll();
        this.toastr.success(response.message);
        this.getFolderList();
      }
      else{
        this.ngxService.stop();
        this.toastr.error(response.message);
      }
    })
  }

  export() {
    this.ngxService.start();
    this.service
      .get1(`export_user_folder_listing`)
      .pipe()
      .subscribe(response => {
        if (response.api_status) {
          this.ngxService.stop();
          this.exportedData = response.data.result;
          csvExporter.generateCsv(this.exportedData)
        } else {
          this.ngxService.stop();
          this.toastr.error(response.message);
        }
      });
  }

}
