import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CarouselModule} from 'primeng/carousel';

import { HomeRoutingModule } from './home-routing.module';
import { CommanHomeComponent } from './comman-home/comman-home.component';
import { CommonComponentModule } from 'src/app/common-component/common-component.module';
import { FormsModule } from '@angular/forms';
import {InputTextModule} from 'primeng/inputtext';
import {CheckboxModule} from 'primeng/checkbox';
import {RadioButtonModule} from 'primeng/radiobutton';
import {ButtonModule} from 'primeng/button';
import {TabViewModule} from 'primeng/tabview';
import {CodeHighlighterModule} from 'primeng/codehighlighter';


@NgModule({
  declarations: [CommanHomeComponent],
  imports: [
    CommonModule,CarouselModule,
    HomeRoutingModule,CommonComponentModule,
        FormsModule,
        InputTextModule,
        ButtonModule,
        CheckboxModule,
        RadioButtonModule,
        TabViewModule,
        CodeHighlighterModule
  ]
})
export class HomeModule { }
