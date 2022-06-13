import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ThemeLayoutComponent } from './theme-layout/theme-layout.component';


const routes: Routes = [
  {
    path:"",
    component:ThemeLayoutComponent,
    
  children: [
    {
      path: "",
      loadChildren: () => import('../pages/pages.module').then(m => m.PagesModule)
    },
  ]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CommonComponentRoutingModule { }
