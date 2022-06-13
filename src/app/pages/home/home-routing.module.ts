import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommanHomeComponent } from './comman-home/comman-home.component';

const routes: Routes = [
  {
    path: "",
    component: CommanHomeComponent
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
