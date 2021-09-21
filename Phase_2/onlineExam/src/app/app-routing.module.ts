import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FrontPageComponent } from './front-page/front-page.component';
import { Question1Component } from './question1/question1.component';
import { Question2Component } from './question2/question2.component';
import { Question3Component } from './question3/question3.component';
import { Question4Component } from './question4/question4.component';
import { Question5Component } from './question5/question5.component';
import { Question6Component } from './question6/question6.component';
import { Question7Component } from './question7/question7.component';
import { Question8Component } from './question8/question8.component';
import { Question9Component } from './question9/question9.component';
import { Question10Component } from './question10/question10.component';
import { ResultPageComponent } from './result-page/result-page.component';

const routes: Routes = [
  {path: "frontPage", component:FrontPageComponent},
  {path: "q1", component:Question1Component},
  {path: "q2", component:Question2Component},
  {path: "q3", component:Question3Component},
  {path: "q4", component:Question4Component},
  {path: "q5", component:Question5Component},
  {path: "q6", component:Question6Component},
  {path: "q7", component:Question7Component},
  {path: "q8", component:Question8Component},
  {path: "q9", component:Question9Component},
  {path: "q10", component:Question10Component},
  {path: "results", component:ResultPageComponent},
  {path:"", redirectTo:"frontPage",pathMatch:"full"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
