import { Component, OnInit } from '@angular/core';
import { questionsService } from '../question.service';
import { questionFormat } from '../questionFormat.model';
import {SessionStorageService} from 'ngx-webstorage';
import { Router} from '@angular/router';

@Component({
  selector: 'app-question7',
  templateUrl: './question7.component.html',
  styleUrls: ['./question7.component.css']
})
export class Question7Component implements OnInit {
  currentQuestion:questionFormat = {question:"",ans4:"",ans3:"",ans2:"",ans1:"",correct:""};
  currentAnswer:string = "";
  arr:Array<boolean> = [];

  constructor(public question:questionsService, public sessionSt:SessionStorageService,public router:Router) { }

  ngOnInit(): void {
    this.question.getQuestions().subscribe(result=>{
      this.currentQuestion = result[6];
    })

    this.arr = this.sessionSt.retrieve("arr");
  }

  answer(event: any)
  {
    this.currentAnswer = event.target.value
    if(this.currentAnswer === this.currentQuestion.correct)
    {
      this.arr[6] = true;
      sessionStorage.setItem("arr", JSON.stringify(this.arr));
    }
    else
    {
      this.arr[6] = false;
      sessionStorage.setItem("arr", JSON.stringify(this.arr));
    }
  }

  nextPage()
  {
    this.router.navigate(["q8"]);
  }

  previousPage()
  {
    this.router.navigate(["q6"]);
  }
}
