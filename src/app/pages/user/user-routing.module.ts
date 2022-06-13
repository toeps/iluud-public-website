import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EditComponent } from './edit/edit.component';
import { ViewComponent } from './view/view.component';
import { ProfileComponent } from './profile/profile.component';
import { FavoriteComponent } from './favorite/favorite.component';
import { HomeComponent } from './home/home.component';
import { BookingsComponent } from './bookings/bookings.component';
import { SearchListComponent } from './search-list/search-list.component';
import { AddAddressComponent } from './add-address/add-address.component';
import { SearchworkerComponent } from './searchworker/searchworker.component';
import { FilterWorkerComponent } from './filter-worker/filter-worker.component';


const routes: Routes = [
  {
    path:"",
    component: HomeComponent
  },
  {
    path:"profile",
    component: ProfileComponent
  },

  {
    path:"favorite",
    component: FavoriteComponent
  },

  {
    path:"edit",
    component: EditComponent
  },
  {
    path:"view",
    component: ViewComponent
  },
  {
    path:"bookings",
    component:BookingsComponent
  },
  {
    path:"search",
    component: SearchListComponent
  },
  {
    path:"address",
    component:AddAddressComponent
  },
  {
    path:"searchworker",
    component:SearchworkerComponent
  },
  {
    path:"filter",
    component: FilterWorkerComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
