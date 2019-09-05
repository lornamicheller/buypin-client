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
  { Parse.initialize("C0XMchZu6Y9XWNUK4lM1UHnnuXhC3dcdpa5fGYpO", "EdN4Xnln11to6pfyNaQ5HD05laenoYu04txYAcfo");
  Parse.serverURL = 'https://parseapi.back4app.com/';
 }

  number:any;
  expMont:any;
  expDate:any;
  cvv:any;
  name:any;
  ngOnInit() {
  }

  goBack() {
    // let options: NativeTransitionOptions = {
    //   duration: 300, 
    //   iosdelay: 300
    // }
    // console.log(options);
    // this.nativePageTransitions.fade(options);
    this.navigate.navigateRoot("/payment-method");
  }

  saveInfo() {
    // let options: NativeTransitionOptions = {
    //   duration: 300, 
    //   iosdelay: 300
    // }
    // console.log(options);
    // this.nativePageTransitions.fade(options);
    this.navigate.navigateRoot("/payment-method");
  }

  createUser(){
    console.log(this.name);
    console.log(this.number);
    console.log(this.expMont);
    console.log(this.expDate);
    console.log(this.cvv);
  
  //   if( this.number == "" || this.number == null || this.expMont == "" || this.expMont == null || this.expDate== "" || this.expDate == null || this.cvv == "" || this.cvv == null) {
  //       //show alert
  //       // this.alertMessage("All fields are required.");
  //       console.log("Vacio");
  //       return;
  //   }
  //                                   //(new key test)
    
  
  // let cardInfo = {
  //   number: this.number,
  //   expMonth: parseInt (this.expMont),
  //   expYear: parseInt(this.expDate),
  //   cvc: this.cvv
  //   }
  
  //   console.log(cardInfo);

  //   this.stripe.setPublishableKey('pk_test_OM6HirzVRTz9sgoUf8RkYwHm00t0zCjxpt'); /// key test, please change when the app is finished
  
  //   this.stripe.createCardToken(cardInfo)
  //     .then(token => {
  //       Parse.Cloud.run('createStripeUser', {cardToken: token.id, email: Parse.User.current().get('email'), userId: Parse.User.current().id
  //       }).then((result) => {
  //         // this.successAdd();
  //         this.errorAlert(JSON.stringify(result) + "Result");
  //         this.saveInfo();
  //       }, (error) =>{
  //         this.errorAlert(JSON.stringify(error) + "Error");
  //         console.log(error);
  //       });
  //     })
  //     .catch(error => {
  //       this.errorAlert(JSON.stringify(error) + "Catch");
  //       console.log(error)
  //     });



  console.log("numero de tarjeta:", this.number);
  console.log("Month:", parseInt(this.expMont));
  console.log("year:", parseInt(this.expDate));
  console.log("cvc: ", this.cvv);

 


   if(this.number != null && this.expMont != null && this.expDate != null && this.cvv != null)
  {
        this.stripe.setPublishableKey('pk_test_OM6HirzVRTz9sgoUf8RkYwHm00t0zCjxpt'); 

      let card = {
        number: this.number,
        expMonth: parseInt(this.expMont),
        expYear: parseInt(this.expDate),
        cvc: this.cvv
      }

      console.log(card);
      // console.log(Parse.User.current().get('email'));

      this.stripe.createCardToken(card)
        .then(token => {
          console.log("Entrando");
          // this.errorAlert(JSON.stringify(token) + "TOKEN");
          Parse.Cloud.run('createStripeUser', {cardToken: token.id, email: Parse.User.current().get('email'), userId: Parse.User.current().id
          }).then((result) => {
            // this.successAdd(); 
            // this.errorAlert(JSON.stringify(result)+ "Result");
            this.goBack();
            // this.location.back();
          }, (error) =>{
            // this.errorAlert(error);
            console.log(error);
          });
        })
        .catch(error => {
          // this.errorAlert(error);
          console.log(error)
        });
        return;
  }
  else if ( this.number == null || this.number == '' || this.expMont == null  || this.expMont == '' || this.expDate == null || this.expDate == '' || this.cvv == null || this.cvv == '')
  { 
    this.errorAlert("Todos los campos son requeridos.");
    return;
  } 

  
  }

  async errorAlert(error : any){
    const alert =  await this.alertCtrl.create({
      header: '¡Alerta!',
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
