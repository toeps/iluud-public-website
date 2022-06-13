import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { ServiceRoutingModule } from './service-routing.module';
import { NewComponent } from './new/new.component';
import { AddLocationComponent } from './add-location/add-location.component';
import { CalendarModule } from 'primeng/calendar';
import {FormsModule, ReactiveFormsModule}    from '@angular/forms'
import {CarouselModule} from 'primeng/carousel';
import { DetailsComponent, FormatTimePipe } from './details/details.component';
import { CompletedComponent } from './completed/completed.component';
import { AddTimeComponent } from './add-time/add-time.component';
import { PaymentComponent } from './payment/payment.component';
import { RescheduleComponent } from './reschedule/reschedule.component';
import { CancelComponent } from './cancel/cancel.component';
import { AddressListComponent } from './address-list/address-list.component';

@NgModule({
  declarations: [NewComponent, AddLocationComponent,DetailsComponent,CancelComponent,CompletedComponent, AddTimeComponent, PaymentComponent, RescheduleComponent, FormatTimePipe, AddressListComponent],
  imports: [
    CommonModule,NgbModule,
    ServiceRoutingModule, CalendarModule,FormsModule,CarouselModule, ReactiveFormsModule
  ]
})
export class ServiceModule { }
