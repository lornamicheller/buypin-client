import { Component, OnInit } from '@angular/core';
import { NavController } from "@ionic/angular";
import { NativePageTransitions, NativeTransitionOptions } from '@ionic-native/native-page-transitions/ngx';
import {Parse} from 'parse';
import { BuypinproviderService } from "../buypinprovider.service";
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
  allZipCodes:any;


  status:any;
  storeZipCode:any;

  storeId:any;

  constructor(public provider: BuypinproviderService,public navigate : NavController, public nativePageTransitions: NativePageTransitions, public alertCtrl: AlertController) { 

    Parse.initialize("C0XMchZu6Y9XWNUK4lM1UHnnuXhC3dcdpa5fGYpO", "EdN4Xnln11to6pfyNaQ5HD05laenoYu04txYAcfo");
    Parse.serverURL = 'https://parseapi.back4app.com/';
  }

  ngOnInit() {
    console.log("Card", this.provider.purchaseCart);
    this.storeId = this.provider.purchaseCart[0].storeID;
    console.log("Store Id", this.storeId);
    this.getZipCodes();
    this.getStoreArray();
    console.log(Parse.User.current().id);

  }

  openPage() {
    // let options: NativeTransitionOptions = {
    //   duration: 300, 
    //   iosdelay: 300
    // }
    // console.log(options);
    // this.nativePageTransitions.fade(options);
    this.navigate.navigateRoot("/address-resume");
  }

  getStoreArray()
  {
    Parse.Cloud.run('getStoreZipCode', { //get the user store
      storeId:this.storeId
    }).then (result => {
    console.log(" Store ZipCodes",result);
    this.storeZipCode = result;
    }, (error) => {
    console.log(error);
    });
  }

  getZipCodes()
  {
    Parse.Cloud.run('getAllZipCodes', { //get the user store
    }).then (result => {
    console.log("ZipCodes",result);
    this.allZipCodes = result;
    }, (error) => {
    console.log(error);
    });
  }

  goBack() {
    // let options: NativeTransitionOptions = {
    //   duration: 300, 
    //   iosdelay: 300
    // }
    // console.log(options);
    // this.nativePageTransitions.fade(options);
    if(this.provider.addresStatus == "Add")
    {
      this.navigate.navigateRoot("/address-resume");
    }

    else{

      this.navigate.navigateRoot("/add-address");
    }

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

   async addAddress(){
    //end-point para añadir la direccion del usuario
   
        let self = this;

    if(this.place == null || this.address == null   || this.city == null || this.state == null || this.zipcode == null){
        this.empty();
    }
    else{
        console.log(this.place);
        console.log(this.address);
        console.log(this.apt);
        console.log(this.city);
        console.log(this.state);
        console.log(this.zipcode);

 var validZipcode = false;
    for(let i =0; i < this.storeZipCode.length; i ++)    
    {
      if(this.zipcode == this.storeZipCode[i])
      {
        validZipcode = true;
      // await for the cloud functions
          var result= await Parse.Cloud.run('createAddress', {
                      name: this.place,
                      address: this.address,
                      apt: this.apt,
                      city:this.city,
                      state: this.state,
                      zipcode: this.zipcode,
                      userId: Parse.User.current().id
                    });
                      // open page
                      this.openPage();

          



      }

    }
    

    // if the zip code is not equal
    if(validZipcode != true)

    {
       this.zipcodeAlert();

    }
   


        
       
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
  
    async zipcodeAlert() {
      const alert = await this.alertCtrl.create({
        header: '¡ALERTA!',
        message: 'Este comercio no entrega a su dirección.',
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

