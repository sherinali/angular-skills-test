import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import *as Firebase from 'Firebase/app';
import { firebase } from '@firebase/app'
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  user: Observable<Firebase.User>;
  IsLoggedIn: Boolean = false;
  //private email: string;
  email: string = '';
  password: string = '';

  constructor(public afAuth: AngularFireAuth, public router: Router) {

    //let status = localStorage.getItem('IsLoggedIn');
    let status;
    setInterval(() => {
      status = localStorage.getItem('IsLoggedIn');
      this.IsLoggedIn = status === 'true';
    }, 1000);
    

    // if (status === 'true') {
    //   this.IsLoggedIn = true;
    // }else{
    //   this.IsLoggedIn = false;
    // }


    // this.user = afAuth.authState;
    // Firebase.auth().onAuthStateChanged(function (user) {
    //   if (user) {
    //     // User is signed in.
    //     this.IsLoggedIn = true;
    //   } else {
    //     // No user is signed in.
    //     this.IsLoggedIn = false;
    //     this.router.navigate(['/Login']);

    //   }
    // });
  }

  ngOnInit() {
    console.log(this.IsLoggedIn)
    console.log(status)
  }

  logout() {
    this.afAuth.auth.signOut();
    this.IsLoggedIn = false
    localStorage.setItem('IsLoggedIn', 'false')
    localStorage.setItem('email', '')
    localStorage.setItem('uid', '')

    this.router.navigate(['/Login']);

  }
  //   myLogin(){
  //     this.afAuth.auth.signInWithEmailAndPassword(this.email, this.password)
  //     .then(user =>{
  //    //   console.log(this.email, this.password)
  //    this.IsLoggedIn = true
  //       localStorage.setItem('isLoggedIn','true')
  //       localStorage.setItem('email',this.afAuth.auth.currentUser.email )

  //       this.afAuth.authState.subscribe(auth=>{
  //         if(auth){
  //   localStorage.setItem('uid',auth.uid )


  //   this.router.navigate(['/home'])

  //         }
  //       })



  //     }).catch(error=>{


  //       console.error(error)
  //     })

  //   }


}
