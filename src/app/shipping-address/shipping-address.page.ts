import { Component, OnInit } from '@angular/core';
import { NavController } from "@ionic/angular";
import { NativePageTransitions, NativeTransitionOptions } from '@ionic-native/native-page-transitions/ngx';
import {Parse} from 'parse';
import { AlertController } from "@ionic/angular";

let parse = require("parse");
@Component({
  selector: 'app-shipping-address',
  templateUrl: './shipping-address.page.html',
  styleUrls: ['./shipping-address.page.scss'],
})
export class ShippingAddressPage implements OnInit {
  place:any;
  address:any;
  apt:any;
  city:any;
  state:any;
  zipcode:any;

  constructor(public navigate : NavController, public nativePageTransitions: NativePageTransitions, public alertCtrl: AlertController) { 

    Parse.initialize("C0XMchZu6Y9XWNUK4lM1UHnnuXhC3dcdpa5fGYpO", "EdN4Xnln11to6pfyNaQ5HD05laenoYu04txYAcfo");
    Parse.serverURL = 'https://parseapi.back4app.com/';
  }

  ngOnInit() {
    console.log(Parse.User.current().id);

  }

  openPage() {
    let options: NativeTransitionOptions = {
      duration: 300, 
      iosdelay: 300
    }
    console.log(options);
    this.nativePageTransitions.fade(options);
    this.navigate.navigateRoot("/address-resume");
  }

  goBack() {
    let options: NativeTransitionOptions = {
      duration: 300, 
      iosdelay: 300
    }
    console.log(options);
    this.nativePageTransitions.fade(options);
    this.navigate.navigateRoot("/add-address");
  }
  
  async errorAlert(error : any){
    const alert =  await this.alertCtrl.create({
      header: 'Error',
      message: error,
      buttons: [{
        text: 'OK',
        role: 'cancel',
        cssClass: 'secondary',
        handler: () => {
          console.log('Confirm Cancel');
        }
      }]
    });
    await alert.present();
  }

  addAddress(){
    //end-point para añadir la direccion del usuario
    
    if(this.place == null || this.address == null || this.apt == null || this.city == null || this.state == null || this.zipcode == null){
        this.empty();
    }
    else{
        console.log(this.place);
        console.log(this.address);
        console.log(this.apt);
        console.log(this.city);
        console.log(this.state);
        console.log(this.zipcode);
        
        Parse.Cloud.run('createAddress', {
          name: this.place,
          address: this.address,
          apt: this.apt,
          city:this.city,
          state: this.state,
          zipcode: this.zipcode,
          userId: Parse.User.current().id
        }).then((result) =>  {
          console.log("Address added")
          this.openPage();
      }, (error) =>{
        this.errorAlert(error);
        console.log(error);
      });
    }

    }

    async empty() {
      const alert = await this.alertCtrl.create({
        header: '¡ALERTA!',
        message: 'Todos los campos son requeridos',
        buttons: [{
          text: 'OK',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }]
      });
  
      await alert.present();
    }
  

  

  }

