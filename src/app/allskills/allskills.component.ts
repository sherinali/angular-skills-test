import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireList, AngularFireDatabase } from 'angularfire2/database';
import {Router, ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-allskills',
  templateUrl: './allskills.component.html',
  styleUrls: ['./allskills.component.css']
})
export class AllskillsComponent implements OnInit {
  p: any ;
  itemList: AngularFireList<any>;
  
  itemArray = []
  
  data = {
    name : '' ,
    phone :  '' ,
    skill :  '' ,
    province :  '' ,
    price :  '' ,
    note: ''
   } 
   loaded:boolean=false
  constructor(public db:AngularFireDatabase , public router:Router) {

    this.itemList =db.list('skills')

    this.itemList.snapshotChanges()
      .subscribe(actions=>{
            actions.forEach(action=>{
              let y = action.payload.toJSON()
              y["$key"] = action.key
              this.itemArray.push(y as ListItemClass)
              this.loaded=true 
  })
      })
      console.log(this.itemArray)    

   }
   ngOnInit() {

  }
  moreInfo(key){
  console.log(key)
  this.router.navigate(['details/' + key]);
  
  }

//   editForm($key) {
//     for (let value of this.itemArray) {
//       if (value['$key'] == $key){
//     console.log(value['$key'], value['name'], value['phone'], value['skill'], value['province'],value['price'], value['note'] );
//     this.data.name = value['name'];
//     this.data.phone = value['phone']; 
//     this.data.skill = value['skill'] ;
//     this.data.province = value['province'] ; 
//     this.data.price = value['price']; 
//     this.data.note= value['note'] ;  
// }

//     }

//   }


// onEdite( $key ){
//   this.data.name 
//   this.data.phone 
//   this.data.skill 
//   this.data.province 
//   this.data.price  
//   this.data.note 
// console.log($key);
// console.log(this.data.name , this.data.phone, this.data.skill,this.data.province ,this.data.price , this.data.note  )

// this.itemList.set($key ,  {
//   name :this.data.name, 
//   phone :this.data.phone, 
//   province :this.data.province, 
//   skill: this.data.skill , 
//   price :this.data.price ,
//   note: this.data.note 
// } )


// this.itemArray = []


 

//   }

  // onDelete($key){
  //   this.itemList.remove($key);
  //   this.itemArray = []
  // }

}


export class ListItemClass{
  $key: string;
  name : string;
  phone :  string;
  province : string;
  skill :  string;
  price : string;
  note :  string;
}