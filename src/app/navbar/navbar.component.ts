import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
//import *as Firebase from 'Firebase/app';
import { firebase } from '@firebase/app'
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
 
  //user: Observable<Firebase.User>;
  IsLoggedIn: boolean = false;
  private email: string;

  constructor(public afAuth: AngularFireAuth, public router: Router) {

    let status = localStorage.getItem('IsLoggedIn')
    console.log(status)

    if (status === 'true') {
      this.IsLoggedIn = true;
    }else{
      this.IsLoggedIn = false;
    }
 

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
  }

  logout() {
    this.afAuth.auth.signOut();
    this.IsLoggedIn = false
    localStorage.setItem('IsLoggedIn','false')
    localStorage.setItem('email', '' )
    localStorage.setItem('uid','' )

    this.router.navigate(['/Login']);

  }
}
