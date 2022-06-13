import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContactComponent } from './contact/contact.component';
import { TermsComponent } from './terms/terms.component';
import { PrivacyComponent } from './privacy/privacy.component';
import { FaqComponent } from './faq/faq.component';
import { FeedbackComponent } from './feedback/feedback.component';

const routes: Routes = [
  {
    path:"",
    component:ContactComponent
  },
  {
    path:"terms",
    component:TermsComponent
  },
  {
    path:"privacy",  
    component:PrivacyComponent
  },
  {
    path:"faq",
    component:FaqComponent
  },
  {
    path:"feedback",
    component:FeedbackComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExtrasRoutingModule { }
