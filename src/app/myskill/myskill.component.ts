import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireList, AngularFireDatabase } from 'angularfire2/database';
import { Router } from '@angular/router';
// import { ifStmt } from '@angular/compiler/src/output/output_ast';
// import { of } from 'rxjs';

@Component({
  selector: 'app-myskill',
  templateUrl: './myskill.component.html',
  styleUrls: ['./myskill.component.css']
})
export class MyskillComponent implements OnInit {

  itemList: AngularFireList<any>;

  itemArray = []

  data = {
    name: '',
    phone: '',
    skill: '',
    province: '',
    price: '',
    note: ''
  }
  loaded: boolean = false
  myUid: any

  constructor(public db: AngularFireDatabase, public router: Router) {

    this.itemList = db.list('skills');

    this.itemList.snapshotChanges()
      .subscribe(actions => {
        actions.forEach(action => {
          let y = action.payload.toJSON()
          y["$key"] = action.key
          this.itemArray.push(y as ListItemClass)
          this.loaded = true
        }
        )
      }
      )

    this.myUid = localStorage.getItem('uid')
    console.log(this.itemArray)
  }


  ngOnInit() {

  }

  editForm($key) {
    for (let value of this.itemArray) {
      if (value['$key'] == $key) {
        console.log(value['$key']);
        this.data.name = value['name'];
        this.data.phone = value['phone'];
        this.data.skill = value['skill'];
        this.data.province = value['province'];
        this.data.price = value['price'];
        this.data.note = value['note'];
       

      }

    }
   
                }


  onEdite($key) {
    console.log($key);
    this.data.name
    this.data.phone
    this.data.skill
    this.data.province
    this.data.price
    this.data.note
    // console.log($key);
    // console.log(this.data.name , this.data.phone, this.data.skill,this.data.province ,this.data.price , this.data.note)

    this.itemList.set($key, {
      name: this.data.name,
      phone: this.data.phone,
      skill: this.data.skill,
      province: this.data.province,
      price: this.data.price,
      note: this.data.note,
      uid: this.myUid
    }
    )
    // console.log($key);
    // console.log(this.data.name, this.data.phone, this.data.skill, this.data.province, this.data.price, this.data.note)
    this.itemArray = []

  }

  onDelete($key) {
    this.itemList.remove($key);
    this.itemArray = []
  }

}


export class ListItemClass {
  $key: string;
  name: string;
  phone: string;
  skill: string;
  province: string;
  price: string;
  note: string;
}
