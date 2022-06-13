import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { MainService } from '../../../Services/main.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  firstName: any;
  lastName: string;
  contactNo: string;
  emailAddress: string;
  profileImg: string;
  password: string;

  constructor(private modalService: NgbModal, private router: Router, private toastr: ToastrService,
    private service: MainService, private ngxService: NgxUiLoaderService) { }

  ngOnInit() {

    this.firstName = localStorage.getItem('name');
    this.lastName = localStorage.getItem('lname');
    this.contactNo = localStorage.getItem('telephone');
    this.emailAddress = localStorage.getItem('email');
    this.profileImg = localStorage.getItem('profileImg');
    this.password = "*********"

  }

  openpopup(content){
    this.modalService.open(content , {centered:true});
  }
  

  logout(){
    this.ngxService.start();
    this.service.get1("logout").pipe().subscribe(response =>{
      if(response.api_status){
        this.ngxService.stop();
        localStorage.clear();
        sessionStorage.clear();
        this.modalService.dismissAll();
        this.toastr.success(response.message);
        this.router.navigate(['/home']);
      }else{
        this.ngxService.stop();
        this.toastr.error(response.message);
      }
    })
  }
}
