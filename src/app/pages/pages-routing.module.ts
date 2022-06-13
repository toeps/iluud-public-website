import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [

  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: "user",
    loadChildren: () => import('./user/user.module').then(m => m.UserModule)
  },
  {
    path: "worker",
    loadChildren: () => import('./worker/worker.module').then(m => m.WorkerModule)
  },
  {
    path: "home",
    loadChildren: () => import('./home/home.module').then(m => m.HomeModule)
  },
  {
    path: "service",
    loadChildren: () => import('./service/service.module').then(m => m.ServiceModule)
  },
  {
    path: "business",
    loadChildren: () => import('./business/business.module').then(m => m.BusinessModule)
  },
  {
    path: "extras",
    loadChildren: () => import('./extras/extras.module').then(m => m.ExtrasModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
