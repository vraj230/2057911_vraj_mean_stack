import { Component, OnInit } from '@angular/core';
import {SessionStorageService} from 'ngx-webstorage';

@Component({
  selector: 'app-result-page',
  templateUrl: './result-page.component.html',
  styleUrls: ['./result-page.component.css']
})
export class ResultPageComponent implements OnInit {
  arr:Array<boolean> = [];
  wrong:Array<number> = [];
  pass:boolean = false;
  correct:number = 0;
  msg:string ="";
  msg2:string ="";
  rand:number = 0;

  constructor(public sessionSt:SessionStorageService) { 
  }

  ngOnInit(): void {
    this.arr = this.sessionSt.retrieve("arr");
    this.start()
  }

  start()
  {

    for(let i = 0; i < this.arr.length; i++)
    {
      if(this.arr[i])
      {
        this.correct++;
      }
      else
      {
        this.wrong.push(i+1)
      }
    }
    this.msg2 = "The questions that you got wrong were: ";
    for(let i = 0; i < this.wrong.length; i++)
    {
      this.msg2 += this.wrong[i] +  " ";
    }

    if(this.correct >= 7)
    {
      this.pass = true;
      this.msg = "Congratulations! You have passed the test!"
    }
    else
    {
      this.pass = false
      this.msg = "Unfortunately you failed the test. Retake the test to pass it."
    }
  }

}
