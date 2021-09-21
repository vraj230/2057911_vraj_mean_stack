import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { questionFormat } from './questionFormat.model';
@Injectable({
  providedIn: 'root'
})

export class questionsService {

    constructor(public http:HttpClient) { }
  
    getQuestions():Observable<questionFormat[]> {
      return this.http.get<questionFormat[]>("/assets/arrayOfQuestions.json");
    }
  }