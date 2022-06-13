import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CommonComponentRoutingModule } from './common-component-routing.module';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ThemeLayoutComponent } from './theme-layout/theme-layout.component';
import { MainContainerComponent } from './main-container/main-container.component';
import { HowitworksComponent } from './howitworks/howitworks.component';
import { HeadSearchComponent } from './head-search/head-search.component';
import {SidebarModule} from 'primeng/sidebar';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgOtpInputModule } from  'ng-otp-input';


@NgModule({
  declarations: [HeaderComponent, FooterComponent, ThemeLayoutComponent, MainContainerComponent, HowitworksComponent, HeadSearchComponent],
  imports: [
    CommonModule,
    CommonComponentRoutingModule,SidebarModule,ReactiveFormsModule,
    FormsModule,   
    NgOtpInputModule,
  ],
  exports: [   
    HeaderComponent,FooterComponent,ThemeLayoutComponent,MainContainerComponent,HowitworksComponent,HeadSearchComponent
  ]
})
export class CommonComponentModule { }
