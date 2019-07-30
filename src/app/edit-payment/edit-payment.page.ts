import { Component, OnInit } from '@angular/core';
import { NavController } from "@ionic/angular";
import { NativePageTransitions, NativeTransitionOptions } from '@ionic-native/native-page-transitions/ngx';
import { Stripe } from '@ionic-native/stripe/ngx';
import { Parse } from 'parse';
import { AlertController } from "@ionic/angular";

let parse = require("parse");
@Component({
  selector: 'app-edit-payment',
  templateUrl: './edit-payment.page.html',
  styleUrls: ['./edit-payment.page.scss'],
})
export class EditPaymentPage implements OnInit {

  constructor(public alertCtrl: AlertController ,private stripe: Stripe,public navigate : NavController, public nativePageTransitions: NativePageTransitions) 
  {parse.serverURL = 'https://parseapi.back4app.com/';
  Parse.initialize("guMi91jQ9mwtDypMkb74aFyKPmI0sQN2CY9TPHW2", "qEd42GYwiQaSxPHkgST0XJXOFqeacdlz4vPYNZh8");
 }

  number:any;
  expMont:any;
  expDate:any;
  cvv:any;
  name:any;
  ngOnInit() {
    console.log(Parse.User.current().id);
    console.log(Parse.User.current().get('email'));
  }

  goBack() {
    let options: NativeTransitionOptions = {
      duration: 300, 
      iosdelay: 300
    }
    console.log(options);
    this.nativePageTransitions.fade(options);
    this.navigate.navigateRoot("/payment-method");
  }

  saveInfo() {
    let options: NativeTransitionOptions = {
      duration: 300, 
      iosdelay: 300
    }
    console.log(options);
    this.nativePageTransitions.fade(options);
    this.navigate.navigateRoot("/payment-method");
  }

  createUser(){
    console.log(this.name);
    console.log(this.number);
    console.log(this.expMont);
    console.log(this.expDate);
    console.log(this.cvv);
  
    if( this.number == "" || this.number == null || this.expMont == "" || this.expMont == null || this.expDate== "" || this.expDate == null || this.cvv == "" || this.cvv == null) {
        //show alert
        // this.alertMessage("All fields are required.");
        console.log("Vacio");
        return;
    }
                                    //(new key test)
    this.stripe.setPublishableKey('pk_test_OM6HirzVRTz9sgoUf8RkYwHm00t0zCjxpt'); /// key test, please change when the app is finished
  
  let cardInfo = {
    number: this.number,
    expMonth: parseInt (this.expMont),
    expYear: parseInt(this.expDate),
    cvc: this.cvv
    }
  
    console.log(cardInfo);

  
    this.stripe.createCardToken(cardInfo)
      .then(token => {
        Parse.Cloud.run('createStripeUser', {cardToken: token.id, email: Parse.User.current().get('email'), userId: Parse.User.current().id
        }).then((result) => {
          // this.successAdd();
          this.saveInfo();
        }, (error) =>{
          this.errorAlert(error);
          console.log(error);
        });
      })
      .catch(error => {
        this.errorAlert(error);
        console.log(error)
      });
  
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





}
