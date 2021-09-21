import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {SessionStorageService} from 'ngx-webstorage';

@Component({
  selector: 'app-front-page',
  templateUrl: './front-page.component.html',
  styleUrls: ['./front-page.component.css']
})

export class FrontPageComponent implements OnInit {

  
  
  
  constructor(public router:Router, public sessionSt:SessionStorageService) { }


  ngOnInit(): void {
    let arr:Array<boolean> = [false, false, false, false, false, false, false, false, false, false];
    this.sessionSt.store("arr", arr);
  }

  start()
  {
    this.router.navigate(["q1"]);
  }

}
