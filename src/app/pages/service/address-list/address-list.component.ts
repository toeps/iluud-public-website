import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MainService } from '../../../Services/main.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { MapsAPILoader } from "@agm/core";
import { ToastrService } from 'ngx-toastr';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-address-list',
  templateUrl: './address-list.component.html',
  styleUrls: ['./address-list.component.scss']
})
export class AddressListComponent implements OnInit {

  addDetails: any;
  Address: string;
  WorkerID: any;
  WorkerRate: any;

  constructor(private formbuilder: FormBuilder, private router: Router, private service: MainService,private toastr: ToastrService,
    private ngxService: NgxUiLoaderService, private mapsAPILoader: MapsAPILoader, private ngZone: NgZone, private route: ActivatedRoute
    ) { }

  ngOnInit() {

       /****************** Getting id of worker by queryparams ********/
       this.route.queryParams.pipe(
        filter(params => params.id))
        .subscribe(params => {
          console.log(params); // {order: "popular"}
  
          this.WorkerID = params.id;
          console.log(this.WorkerID); // popular
        });
  
    /***********code ends here ******************/
  
    /****************** Getting Rate of worker by queryparams ********/
    this.route.queryParams.pipe(
      filter(params => params.rate))
      .subscribe(params => {
        console.log(params); // {order: "popular"}
  
        this.WorkerRate = params.rate;
        console.log(this.WorkerRate); // popular
      });
  
  /***********code ends here ******************/

    this.getaddress();
    this.maps1();
  }


  getaddress(){
    this.ngxService.start();
    this.service.get1("address_listing").pipe().subscribe(response => {
      if(response.api_status){
        this.ngxService.stop();
        this.addDetails = response.data.address_listing; 
        console.log(this.addDetails, "2222222222222222223333333333333")
      }else{
        this.ngxService.stop();
        this.toastr.error(response.message);
      }
    })
  }



   /***********************code for address api ***********************/
   latitude: number;
   longitude: number;
   zoom: number;
   private geoCoder;

   @ViewChild("search1", { static: true })
   public searchElementRef1: ElementRef;
 
   maps1() {
     this.mapsAPILoader.load().then(() => {
       // this.setCurrentLocation();
       this.geoCoder = new google.maps.Geocoder();
 
       let autocomplete = new google.maps.places.Autocomplete(
         this.searchElementRef1.nativeElement,
         {
           // types: ["(cities)"],
           types: [],
          //  componentRestrictions: { country: countryShortName }
         }
       );
       autocomplete.addListener("place_changed", () => {
         this.ngZone.run(() => {
           //get the place result
           let place: google.maps.places.PlaceResult = autocomplete.getPlace();
 
           //verify result
           if (place.geometry === undefined || place.geometry === null) {
             return;
           }
           console.log(place, "qwertyuioasdfghjk1111111111111111111111111111111111111")
           this.Address = place['name'];
           localStorage.setItem('CityAddress', this.Address)
           this.router.navigate(['/service/location'])
           console.log(this.Address, "3333333333333333333333333333")
           this.latitude = place.geometry.location.lat();
           this.longitude = place.geometry.location.lng();
           this.zoom = 12;
         });  
       });
     });
   }
 
     /********************************* */



     sendAddress(data){
       localStorage.setItem('addressData', JSON.stringify(data))
      //  console.log(data, "%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%")
       this.router.navigate(['/service'])
     }
     
}
