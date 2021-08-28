import { analyzeAndValidateNgModules } from '@angular/compiler';
import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent {
  title = 'portfolio';
  users:JSON[] = new Array();
  login:boolean = true;
  signup:boolean = false;
  portfolio = false;
  display_username:string = "" 
  data:string = ""
  arr1:JSON[] = new Array()
  
  loginRef = new FormGroup({
    user:new FormControl("",[Validators.required]),
    pass:new FormControl("",[Validators.required])
  })

  signupRef = new FormGroup({
    uid:new FormControl("", [Validators.required]),
    key:new FormControl("", [Validators.required]),
    first:new FormControl("", [Validators.required]),
    last:new FormControl("", [Validators.required])
  })

  displayRef = new FormGroup({
    name:new FormControl("", [Validators.required]),
    number:new FormControl("", [Validators.required]) 
  })
  msg:string=""

  checkUser():void {
    let login = this.loginRef.value
    this.arr1 = new Array()
    let str:any = sessionStorage.getItem("array")
    
    let arr:any = JSON.parse(str);
    if(arr == null)
    {
      this.msg = "No such user in the database"
      this.loginRef.reset();
      return
    }
    for(let i = 0; i < arr.length; i++)
    {
      console.log(arr[i]["uid"])
      console.log(arr[i]["key"])
      console.log(login.user + " " + login.pass)
      if(arr[i]["uid"] == login.user && arr[i]["key"] == login.pass)
      { 
        this.msg = "Successfully login"
        this.display_username = login.user
        this.toPortfolio()
      }
    }
    this.msg = "Incorrect Username or Password"
    this.loginRef.reset();
  }
  storeUser():void{
    console.log("inside storeUser")
    let signup = this.signupRef.value

    let obj:any = {}
    obj["first"] = signup.first
    obj["last"] = signup.last
    obj["uid"] = signup.uid
    obj["key"] = signup.key
    obj["contact"] = new Array()
    this.users.push(obj)

    sessionStorage.setItem("array", JSON.stringify(this.users));
    this.toLogin()
  }

  displayUser():void{
    console.log("inside displayUser")
    let user = this.displayRef.value
    //let arr1:JSON[] = new Array()  
    let obj:any = {}
    obj["name"] = user.name
    obj["number"] = user.number
    this.arr1.push(obj)
    let str:string = JSON.stringify(this.arr1)
    
    let arr:any = JSON.parse(str)
    //display the data in the table
    let startTable:string = "<tr><th>Name </th><th>Phone No. </th></tr><br/>"
    let tablecontent:string = ""
    //console.log("before loop")
    for(let i = 0; i < arr.length; i++)
    {
      //console.log("inside loop")
      //console.log(arr[i]["name"] + "  " + arr[i]["number"])

      //console.log("length = " + arr.length)
      tablecontent += "<tr><td>" + arr[i]["name"] + "  </td><td>  " + arr[i]["number"] + "</td></tr><br/>"
    }
    this.data = startTable + tablecontent

    //set the data in the json Array
  //   let str_data:any = sessionStorage.getItem("array")
    
  //   let user_data:any = JSON.parse(str_data);
  //   for(let i = 0; i < user_data.length; i++)
  //   {
  //     if(user_data[i]["uid"] == user)
  //     {
  //       user_data[i]["contact"] = this.arr1
  //     }
  //   }
  //   sessionStorage.setItem("array", JSON.stringify(user_data));

  }

  toSignup():void {
    console.log("inside signup")
    this.login = false
    this.signup = true
  }
  toLogin():void {
    console.log("inside toLogin")
    this.login = true
    this.signup = false
  }

  toPortfolio():void{
    this.login = false
    this.signup = false
    this.portfolio = true
  }
}
