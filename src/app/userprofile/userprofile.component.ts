import { Component, OnInit } from '@angular/core';
import { AngularFireList, AngularFireDatabase } from 'angularfire2/database';
import { AngularFireStorageReference, AngularFireStorage, AngularFireUploadTask } from 'angularfire2/storage';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.css']
})
export class UserprofileComponent implements OnInit {

  email: string;
  myid: string;

  itemList: AngularFireList<any>;
  itemArray = []

  data = {
    name: '',
    age: '',
    phone: '',
    address: '',
    city: '',
    job: '',
    email: '',
    image: ''
  }
  spinner: boolean = true
  redirect: boolean = false
  userKey: any
  ref: AngularFireStorageReference;
  task: AngularFireUploadTask;
  downloadURL: Observable<string>;
  uploadPercent: Observable<number>;
  imageURL: string
  imgload: boolean = true;

  constructor(private afStorage: AngularFireStorage, public db: AngularFireDatabase, public router: Router) {
    this.email = localStorage.getItem('email');
    this.myid = localStorage.getItem('uid');
    // console.log(this.redirect)
    // if (this.redirect == false) {''}
    this.itemList = db.list('users')

    this.itemList.snapshotChanges()
      .subscribe(actions => {
        actions.forEach(action => {
          let y = action.payload.toJSON()
          y["$key"] = action.key
          this.userKey
          //   console.log(action.payload.toJSON())
          //   console.log(action.payload.child('uid').val() )

          if (action.payload.child('uid').val() == this.myid) {
            this.userKey = action.key
            this.itemArray.push(y as ListItemClass)
            this.data.name = this.itemArray[0]['name']
            this.data.phone = this.itemArray[0]['phone']
            this.data.age = this.itemArray[0]['age']
            this.data.address = this.itemArray[0]['address']
            this.data.city = this.itemArray[0]['city']
            this.data.job = this.itemArray[0]['job']
            this.data.email = this.itemArray[0]['email']
            this.data.image = this.itemArray[0]['image']
            this.imgload = false
            this.spinner = false
            console.log(this.userKey)
            console.log(this.data)
          }
        })
      }
      )


    // console.log(this.itemArray[0])
    // this.data = this.itemArray[0]
  }

  ngOnInit() {
    console.log(this.email)
    console.log(this.myid)
    console.log(this.userKey)
    console.log(this.imageURL)

  }



  // upload(event) {
  //   const id = Math.random().toString(36).substring(2);
  //   this.ref = this.afStorage.ref(id);
  //   this.task = this.ref.put(event.target.files[0]);
  //   this.downloadURL = this.task.downloadURL()
  //   this.downloadURL.subscribe(url => {

  //     if (url) {
  //       this.imageURL = url

  //     }
  //     console.log(this.imageURL)

  //     this.itemList.set(this.userKey, {
  //       name: this.data.name,
  //       phone: this.data.phone,
  //       age: this.data.age,
  //       address: this.data.address,
  //       city: this.data.city,
  //       job: this.data.job,
  //       email: this.email,
  //       uid: this.myid,
  //       image: this.imageURL
  //     })

  //   })

  // }

  // upload(event) {
  //   const id = Math.random().toString(36).substring(2)
  //   this.afStorage.upload(id, event.target.files[0]).then(() => {
  //     this.ref = this.afStorage.ref(id)
  //     this.ref.getDownloadURL().subscribe(url => {
  //       console.log(url)

  //       if (url) {
  //         this.imageURL = url
  //         this.itemList.set(this.userKey, {
  //           name: this.data.name,
  //           age: this.data.age,
  //           phone: this.data.phone,
  //           address: this.data.address,
  //           city: this.data.city,
  //           job: this.data.job,
  //           email: this.email,
  //           uid: this.myid,
  //           image: this.imageURL
  //         })

  //       }
  //     })
  //   })

  // }
  // ----------------------------------------------------
  upload(event) {
    // random name = path of image in storge server
    const id = Math.random().toString(36).substring(2);
    //uapload task(path,and file) and storge then make reference
    const TaskUpload = this.afStorage.upload(id, event.target.files[0])
      .then(() => {
        this.ref = this.afStorage.ref(id);
        //getDownloadURL() Observable method
        const downloadURL = this.ref.getDownloadURL().subscribe(url => {

          //  if (url) {
          this.imageURL = url
          // }

          console.log(this.imageURL)

          this.itemList.set(this.userKey, {
            name: this.data.name,
            phone: this.data.phone,
            age: this.data.age,
            address: this.data.address,
            city: this.data.city,
            job: this.data.job,
            email: this.email,
            uid: this.myid,
            image: this.imageURL
          })
        })
      })




  }
  //...........................
  // upload(event) {
  //   const id = Math.random().toString(36).substring(2)
  //   this.afStorage.upload(id, event.target.files[0]).then(() => {
  //     this.ref = this.afStorage.ref(id)
  //     this.ref.getDownloadURL().subscribe(url => {
  //       console.log(url)

  //       if (url) {
  //         this.imageURL = url
  //         console.log(this.imageURL)
  //       }

  //       this.itemList.set(this.userKey, {
  //         name: this.data.name,
  //         age: this.data.age,
  //         phone: this.data.phone,
  //         address: this.data.address,
  //         city: this.data.city,
  //         job: this.data.job,
  //         email: this.email,
  //         uid: this.myid,
  //         image: this.imageURL
  //       })


  //     })
  //   })
  // }





  onEdit() {


    this.itemList.set(this.userKey, {
      name: this.data.name,
      phone: this.data.phone,
      age: this.data.age,
      address: this.data.address,
      city: this.data.city,
      job: this.data.job,
      email: this.email,
      uid: this.myid,
      image: this.imageURL
    })

  }



}

export class ListItemClass {
  $key: string;
  name: string;
  age: string;
  phone: string;
  address: string;
  city: string;
  job: string;
  email: string;
  image: string;
}
