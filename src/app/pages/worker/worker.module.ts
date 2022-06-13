import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WorkerRoutingModule } from './worker-routing.module';
import { ProfileComponent } from './profile/profile.component';
import { FeedbackComponent } from './feedback/feedback.component';
import {FormsModule, ReactiveFormsModule}  from '@angular/forms';
import {RatingModule} from 'primeng/rating';


@NgModule({
  declarations: [ProfileComponent, FeedbackComponent],
  imports: [
    CommonModule,
    WorkerRoutingModule,RatingModule,FormsModule, ReactiveFormsModule
  ]
})
export class WorkerModule { }
