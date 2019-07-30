import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { NativePageTransitions, NativeTransitionOptions } from '@ionic-native/native-page-transitions/ngx';
import { Parse } from 'parse';
import { AlertController } from "@ionic/angular";
import { BuypinproviderService } from "./../../app/buypinprovider.service";

let parse = require("parse");

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})

export class AccountPage implements OnInit {
  name: any;
  email: any;
  phone: any;
  address: any;
  userAddress: any;
  apt: any;
  city: any;
  zipcode: any;
  state: any;
  addrObj: any;

  constructor(
    public navigate: NavController,
    public nativePageTransitions: NativePageTransitions,
    public alert:AlertController,
    public provider: BuypinproviderService
  ) {
    Parse.initialize("C0XMchZu6Y9XWNUK4lM1UHnnuXhC3dcdpa5fGYpO", "EdN4Xnln11to6pfyNaQ5HD05laenoYu04txYAcfo");
    Parse.serverURL = 'https://parseapi.back4app.com/';
  }

  ngOnInit() {
    console.log(Parse.User.current().id);
    console.log(Parse.User.current().get('fullName'));
    console.log(Parse.User.current().get('email'));
    console.log(Parse.User.current().get('phoneNumber'));
    console.log(Parse.User.current().get('Address', 'apt', 'city', 'state', 'zipcode'));

    this.name = Parse.User.current().get('fullName');
    this.email = Parse.User.current().get('email');
    this.phone = Parse.User.current().get('phoneNumber');
    this.getUserAddress();       
    this.object();
  }

  goBack() {
    // const options: NativeTransitionOptions = {
    //   duration: 300,
    //   iosdelay: 300
    // };
    // console.log(options);
    // this.nativePageTransitions.fade(options);
    this.navigate.navigateRoot('/tabs/tabs/profile');
  }

  object() {
    this.addrObj = {
      "apt": this.apt,
      "city": this.city,
      "zipcode": this.zipcode,
      "storeID": this.state
    };
    console.log(this.addrObj);
  }

  updateUser() {
    const user = Parse.Object.extend("_User");
    const query = new Parse.Query(user);

    query.equalTo('objectId', Parse.User.current().id);

      if (this.name !== undefined && this.name !== null) {
        Parse.User.current().get('fullName');
        Parse.User.current().set('fullName', this.name);
      }

      if (this.email !== undefined && this.email !== this.email) {
        Parse.User.current().set('email', this.email);
      }

      if (this.phone !== undefined && this.phone !== null) {
        //Parse.User.current().get('phoneNumber');
        Parse.User.current().set('phoneNumber', this.phone);
      }

      console.log(this.name);
      console.log(this.email);
      console.log(this.phone);

      Parse.User.current().save().then(user => {
        console.log('user updated');
      }, error => {
        console.log(error);
      });
  }
  // saveChanges()
  // {
  //   console.log("Save Change");
  //   //   this.userChange = new Parse.User();

  //   //   this.userChange.set('fullName', this.fullName);
  //   //   this.userChange.set('email', this.email);
  //   //   this.userChange.set('phone', this.phone);

  //   //  this.userChange.save().then((response)=>
  //   //   {
  //   //       console.log(response);
  //   //   });


  //   Parse.User.current().set('fullName', this.name);
  //   Parse.User.current().set('email', this.email);
  //   Parse.User.current().set('phone', this.phone);

  //   Parse.User.current().save().then((result)=>
  //   {
  //       console.log(result);
  //       this.savedInfo();
  //   });
    
  // }

  // async savedInfo() {
  //   let self = this;
  //   const alert = await this.alert.create({
  //     header: 'Alert!',
  //     message:'Your information has been saved!',
  //     buttons: [
  //       {
  //         text: 'OK',
  //         role: 'camera',
  //         cssClass: 'secondary',
  //         handler: (blah) => {
  
  //           this.ngOnInit();
          
  //           console.log('Confirm Cancel: blah');
  //         }
  //       }
  //     ]
  //   });
  // }

  inputTest() {
    if (this.name !== undefined) {
      console.log(this.name);
    }

    if (this.email !== undefined) {
      console.log(this.email);
    }

    if (this.phone !== undefined) {
      console.log(this.phone);
    }
  }

  getUserAddress() {
    //end-point para añadir la direccion del usuario
    Parse.Cloud.run("getAddress", {
      userId: Parse.User.current().id
    }).then((result) => {
      console.log(result);
      this.address = result;
    }, (error) =>{
    console.log(error);
    });
   }
}
  
