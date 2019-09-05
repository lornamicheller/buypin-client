import { Component, OnInit } from '@angular/core';
import { NativePageTransitions, NativeTransitionOptions } from '@ionic-native/native-page-transitions/ngx';
import { NavController } from "@ionic/angular";
import { BuypinproviderService } from "../buypinprovider.service";
import { Parse } from 'parse';

let parse = require("parse");
@Component({
  selector: 'app-card-info',
  templateUrl: './card-info.page.html',
  styleUrls: ['./card-info.page.scss'],
})
export class CardInfoPage implements OnInit {

  constructor(public provider : BuypinproviderService,private nativePageTransitions: NativePageTransitions, public navigate : NavController) 
  { 
     Parse.initialize("C0XMchZu6Y9XWNUK4lM1UHnnuXhC3dcdpa5fGYpO", "EdN4Xnln11to6pfyNaQ5HD05laenoYu04txYAcfo");
     Parse.serverURL = 'https://parseapi.back4app.com/';
 }

 serviceDataObject:any;
 carImage:any;
 carModel:any;
 carColor:any;
 platiumCar:any;
 driverName:any;

  ngOnInit() {
    this.getCarInfo();
    this.serviceDataObject = this.provider.serviceObject;
    console.log( this.provider.driverObjectId.id);
    this.driverName = this.serviceDataObject.get('user').get('fullName');

    console.log("Card_Info:", this.serviceDataObject);
  }

  getCarInfo()
  {
    Parse.Cloud.run('getCar', { //get the user store
      userId:  this.provider.driverObjectId.id
    }).then (result => {
        console.log(result);
        this.carImage = result.get("carImage").url();
        this.carModel = result.get("model");
        this.carColor = result.get("color");
        this.platiumCar = result.get("license");

        console.log(this.carModel);
        console.log(this.carColor);
        console.log(this.platiumCar);
        console.log(this.carImage);
    }, (error) => {
    console.log(error);
    });
     
  }

  goBack() {
    // let options: NativeTransitionOptions = {
    //   duration: 300, 
    //     iosdelay: 300,
    //   androiddelay: 100,
    // }
    // console.log(options);
    // this.nativePageTransitions.fade(options);
    this.navigate.navigateRoot("/history-order");
  }

}
