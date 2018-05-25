import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase ,AngularFireList } from 'angularfire2/database';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  email:string = '';
  password :string ='';
  itemList: AngularFireList<any>
  IsLoggedIn: boolean = false; 

  constructor(public db:AngularFireDatabase, private fire:AngularFireAuth , private router:Router ) {
    this.itemList = db.list('users')
    this.itemList = db.list('skills')
   }

  ngOnInit() {
  }

  myRegister(){
    this.fire.auth.createUserWithEmailAndPassword(this.email, this.password)
    .then(user =>{
     // console.log(this.email, this.password)
     this.IsLoggedIn = true;
      localStorage.setItem('IsLoggedIn','true')
      localStorage.setItem('email',this.fire.auth.currentUser.email )

      this.fire.authState.subscribe(auth=>{
        if(auth){
  localStorage.setItem('uid',auth.uid )
  
  this.itemList.push({
    email: this.email ,
    uid : auth.uid,
    name : ''  ,
    phone :  '' ,
    age : '' ,
    address :  '' ,
    city :  '' ,
    job : '',
    image:'',
    note:''

  })
        }
      })
      
      this.router.navigate(['addskill'])
     }).catch(error=>{
      console.error(error)
     })
  }

}
