import { Component, OnInit } from '@angular/core';
import { questionsService } from '../question.service';
import { questionFormat } from '../questionFormat.model';
import {SessionStorageService} from 'ngx-webstorage';
import { Router} from '@angular/router';


@Component({
  selector: 'app-question10',
  templateUrl: './question10.component.html',
  styleUrls: ['./question10.component.css']
})
export class Question10Component implements OnInit {
  currentQuestion:questionFormat = {question:"",ans4:"",ans3:"",ans2:"",ans1:"",correct:""};
  currentAnswer:string = "";
  arr:Array<boolean> = [];

  constructor(public question:questionsService, public sessionSt:SessionStorageService,public router:Router) { }

  ngOnInit(): void {
    this.question.getQuestions().subscribe(result=>{
      this.currentQuestion = result[9];
    })

    this.arr = this.sessionSt.retrieve("arr");
  }

  answer(event: any)
  {
    this.currentAnswer = event.target.value
    if(this.currentAnswer === this.currentQuestion.correct)
    {
      this.arr[9] = true;
      sessionStorage.setItem("arr", JSON.stringify(this.arr));
    }
    else
    {
      this.arr[9] = false;
      sessionStorage.setItem("arr", JSON.stringify(this.arr));
    }
  }

  resultPage()
  {
    this.router.navigate(["results"]);
  }

  previousPage()
  {
    this.router.navigate(["q9"]);
  }

}
