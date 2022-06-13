import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BusinessRoutingModule } from './business-routing.module';
import { FavFolderComponent } from './fav-folder/fav-folder.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonComponentModule } from 'src/app/common-component/common-component.module';
import { FavFolderListComponent } from './fav-folder-list/fav-folder-list.component';
import {NgxPaginationModule} from 'ngx-pagination';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
  declarations: [FavFolderComponent, FavFolderListComponent],
  imports: [
    CommonModule,
    BusinessRoutingModule,NgbModule,CommonComponentModule, NgxPaginationModule, ReactiveFormsModule, FormsModule
  ]
})
export class BusinessModule { }
     