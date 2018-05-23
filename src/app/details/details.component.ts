import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database'

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  id: any
  itemList: AngularFireList<any>
  itemArray = [];

  data = {
    name: '',
    phone: '',
    notes: '',
    skill: '',
    province: '',
    price: '',
    email: '',
    uid: '',
    image: ''
  }
  constructor(public route: ActivatedRoute, public db: AngularFireDatabase) {
    this.route.params.subscribe(params => {
      this.id = params
    });

    this.itemList = db.list('skills')

    this.itemList.snapshotChanges()
      .subscribe(actions => {
        actions.forEach(action => {
          let y = action.payload.toJSON()
          y["$key"] = action.key

          if (action.key == this.id['id']) {
            this.itemArray.push(y as ListItemClass)
            this.data.name = this.itemArray[0]['name']
            this.data.phone = this.itemArray[0]['phone']
            this.data.skill = this.itemArray[0]['skill']
            this.data.province = this.itemArray[0]['province']
            this.data.price = this.itemArray[0]['price']
            this.data.notes = this.itemArray[0]['note']
            this.data.email = this.itemArray[0]['email']


            console.log(this.itemArray[0])
          }

        })
      })


    this.itemList = db.list('/users')

    this.itemList.snapshotChanges()
      .subscribe(actions => {
        actions.forEach(action => {
          let y = action.payload.toJSON()
          if (y['uid'] == this.data.uid)
            this.data.image = y['image']
          console.log("this iamge url" + this.data.image)
          console.log("this key" + y['uid'])
        })
      })

  }



  ngOnInit() {
    console.log(this.id['id'])
    console.log(this.data)
  }

}
export class ListItemClass {
  $key: string;
  name: string;
  phone: string;
  notes: string;
  skill: string;
  province: string;
  price: string;
  email: string;
}