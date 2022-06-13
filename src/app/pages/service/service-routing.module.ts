import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NewComponent } from './new/new.component';
import { AddLocationComponent } from './add-location/add-location.component';
import { DetailsComponent } from './details/details.component';
import { CompletedComponent } from './completed/completed.component';
import { AddTimeComponent } from './add-time/add-time.component';
import { PaymentComponent } from './payment/payment.component';
import { RescheduleComponent } from './reschedule/reschedule.component';
import {CancelComponent} from './cancel/cancel.component';
import { AddressListComponent } from './address-list/address-list.component';

const routes: Routes = [
  {
    path:"",
    component:NewComponent
  },
  {
    path:"location",
    component:AddLocationComponent
  },
  {
    path:"details",
    component:DetailsComponent
  },
  {
    path:"completed",
    component:CompletedComponent
  },
  {
    path:"add-time",
    component:AddTimeComponent    
  },
  {
    path:"payment",
    component:PaymentComponent
  },
  {
    path:"reschedule",
    component:RescheduleComponent
  },
  {
    path:"cancel",
    component:CancelComponent
  },
  {
    path:"address-list",
    component: AddressListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ServiceRoutingModule { }
