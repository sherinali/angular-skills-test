import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule} from '@angular/forms';
import {NgxPaginationModule} from 'ngx-pagination';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { AddskillComponent } from './addskill/addskill.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { MyskillComponent } from './myskill/myskill.component';
import { AllskillsComponent } from './allskills/allskills.component';
import { DetailsComponent } from './details/details.component';
import { UserprofileComponent } from './userprofile/userprofile.component';
import { RouterModule, Routes } from '@angular/router';
import { Router } from '@angular/router';
import { AngularFireModule } from 'angularfire2';
import { environment } from '../environments/environment';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { Observable } from 'rxjs/observable';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireStorageModule } from 'angularfire2/storage';
import *as Firebase from 'Firebase/app';
import { firebase } from '@firebase/app';
import { finalize } from 'rxjs/operators';
// import {Animations} from '@angular/animations';


const routes: Routes=[{path:'',redirectTo:'home',pathMatch:'full'} ,
{path:'home',component:HomeComponent},
{path:'addskill',component:AddskillComponent}
,{path:'Login',component:LoginComponent},
{path:'Register',component:RegisterComponent},
{path:'Myskill',component:MyskillComponent},
{path:'Allskills',component:AllskillsComponent},
{path:'details/:id' ,  component: DetailsComponent },
{path:'userprofile' ,  component: UserprofileComponent }
 ]
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    AddskillComponent,
    LoginComponent,
    RegisterComponent,
    MyskillComponent,
    AllskillsComponent,
    DetailsComponent,
    UserprofileComponent,
     
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    NgxPaginationModule
   
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
