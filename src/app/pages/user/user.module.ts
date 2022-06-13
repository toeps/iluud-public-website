import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { ViewComponent } from './view/view.component';
import { EditComponent } from './edit/edit.component';
import { ProfileComponent } from './profile/profile.component';
import { FavoriteComponent } from './favorite/favorite.component';
import { CommonComponentModule } from 'src/app/common-component/common-component.module';
import { HomeComponent } from './home/home.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BookingsComponent } from './bookings/bookings.component';
import { SliderModule } from 'primeng/slider';
import { CalendarModule } from 'primeng/calendar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { NgOtpInputModule } from 'ng-otp-input';
import { AgmCoreModule } from '@agm/core';
import { SearchListComponent } from './search-list/search-list.component';
import { AddAddressComponent } from './add-address/add-address.component';
import { SearchworkerComponent } from './searchworker/searchworker.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { FilterWorkerComponent } from './filter-worker/filter-worker.component';

@NgModule({
  declarations: [ViewComponent, EditComponent, ProfileComponent, FavoriteComponent, HomeComponent, BookingsComponent, SearchListComponent, AddAddressComponent, SearchworkerComponent, FilterWorkerComponent],
  imports: [
    CommonModule,
    UserRoutingModule, CommonComponentModule,ReactiveFormsModule,NgOtpInputModule, AgmCoreModule,NgxPaginationModule,
    NgbModule, SliderModule, CalendarModule, FormsModule, NgMultiSelectDropDownModule.forRoot()
  ]
})
export class UserModule { }
  