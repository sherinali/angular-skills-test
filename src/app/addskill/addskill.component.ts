import { Component, OnInit } from '@angular/core';
import { STRING_TYPE } from '@angular/compiler/src/output/output_ast';
import { Observable } from '@firebase/util';
import { AngularFireList, AngularFireDatabase } from 'angularfire2/database';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { auth } from 'Firebase';


@Component({
  selector: 'app-addskill',
  templateUrl: './addskill.component.html',
  styleUrls: ['./addskill.component.css']
})
export class AddskillComponent implements OnInit {

  data = {
    name: '',
    phone: '',
    province: '',
    skill: '',
    price: '',
    note: ''
  }

  itemList: AngularFireList<any>;
  email: string = '';
  uid: any;

  constructor(private fire: AngularFireAuth, public db: AngularFireDatabase, public router: Router) {

    this.itemList = db.list('skills')

    let user= localStorage.getItem('email');
    this.email = user
    //let user = this.fire.auth.currentUser.email;
    console.log(user)
    console.log("-------------------------------------")
    console.log(this.data.name);
    this.uid= localStorage.getItem('uid')
    console.log('uid : ' + this.uid)
    // this.fire.authState.subscribe(auth => {
    //   if (auth) {
    //   this.uid = auth.uid
    //     console.log('uid : ' + this.uid)
    //   }
    // })


  }

  ngOnInit() {

  }

  insertskill() {
    
    this.itemList.push({
      name: this.data.name,
      phone: this.data.phone,
      province: this.data.province,
      skill: this.data.skill,
      price: this.data.price,
      note: this.data.note,
      email: this.email ,
      uid : this.uid
      
    })

    this.router.navigate(['/Myskill'])
  }


}