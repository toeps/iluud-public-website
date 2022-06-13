import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FavFolderComponent } from './fav-folder/fav-folder.component';
import { FavFolderListComponent } from './fav-folder-list/fav-folder-list.component';


const routes: Routes = [
  {
    path: "",
    component: FavFolderComponent
  },
  {
    path: "favorite",
    component: FavFolderComponent
  },
  {
    path: "favorite-list",
    component: FavFolderListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BusinessRoutingModule { }
