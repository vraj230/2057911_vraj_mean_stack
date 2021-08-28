import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Task } from './task';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'to-do-list';
  tasks:Array<Task> = new Array();

  constructor(){

    let str:any = localStorage.getItem("info")
    let arr:any = JSON.parse(str)
    this.tasks = arr
    if(this.tasks == null)
    {
      this.tasks = new Array()
    }
  }
  
  //info:string = ""

  signupRef = new FormGroup({
    id:new FormControl("", [Validators.required]),
    name:new FormControl("", [Validators.required]),
    task:new FormControl("", [Validators.required]),
    date:new FormControl("", [Validators.required])
  })


  addTask():void{
    let str:any = localStorage.getItem("info")
    let arr:any = JSON.parse(str)
    this.tasks = arr
    if(this.tasks == null)
    {
      this.tasks = new Array()
    }
    let data = this.signupRef.value
    let task = new Task(data.id, data.name, data.task, data.date)

    this.tasks.push(task)
    console.log(this.tasks.length)

    localStorage.setItem("info", JSON.stringify(this.tasks))

  }
  
}
