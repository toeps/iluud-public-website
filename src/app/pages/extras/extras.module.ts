import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExtrasRoutingModule } from './extras-routing.module';
import { TermsComponent } from './terms/terms.component';
import { PrivacyComponent } from './privacy/privacy.component';
import { ContactComponent } from './contact/contact.component';
import { FaqComponent } from './faq/faq.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FeedbackComponent } from './feedback/feedback.component';


@NgModule({
  declarations: [TermsComponent, PrivacyComponent, ContactComponent, FaqComponent, FeedbackComponent],
  imports: [
    CommonModule,
    ExtrasRoutingModule,
    NgbModule,
    FormsModule, ReactiveFormsModule
  ]
})
export class ExtrasModule { }
