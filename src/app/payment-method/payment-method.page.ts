import { Component, OnInit } from '@angular/core';
import { NativePageTransitions, NativeTransitionOptions } from '@ionic-native/native-page-transitions/ngx';
import { NavController } from "@ionic/angular";
import { Stripe } from '@ionic-native/stripe/ngx';
import { Parse } from 'parse';
import { AlertController } from "@ionic/angular";
import { Location } from "@angular/common";
import { BuypinproviderService } from "../buypinprovider.service";
import { PopoverController } from '@ionic/angular';
import { PopoverserviceComponent } from './../popoverservice/popoverservice.component';

let parse = require("parse");
@Component({
  selector: 'app-payment-method',
  templateUrl: './payment-method.page.html',
  styleUrls: ['./payment-method.page.scss'],
})
export class PaymentMethodPage implements OnInit {

  cardNumber:any;
  Stripe:any;
  month:any;
  year:any;
  cvv:any;
  cards:any;
  status:any;

  constructor(public popoverController: PopoverController,public provider: BuypinproviderService,private stripe:Stripe,private nativePageTransitions: NativePageTransitions, public navigate : NavController, public alert:AlertController) {
    parse.serverURL = 'https://parseapi.back4app.com/';
    Parse.initialize("guMi91jQ9mwtDypMkb74aFyKPmI0sQN2CY9TPHW2", "qEd42GYwiQaSxPHkgST0XJXOFqeacdlz4vPYNZh8");
   }

  ngOnInit() {
    this.getCards();
    console.log(this.provider.currentLocation);
    if(this.provider.currentLocation == "Checkout")
    {
      this.status = true;
      console.log(this.status);
    }
    else
    {
      this.status = false;
      console.log(this.status);
    }
  }

  getCards(){
    this.stripe.setPublishableKey('pk_test_OM6HirzVRTz9sgoUf8RkYwHm00t0zCjxpt');

    console.log(Parse.User.current().id);
    
    Parse.Cloud.run('getStripeUserCards',{userId: Parse.User.current().id}).then((result) =>  
    {
      console.log(result);
     this.cards=result;

     this.provider.cardId = this.cards[0].id;
     console.log(this.provider.cardId);
 
    
  },(error) =>{
    // this.errorAlert(error);
    console.log(error);
  });
  }

  goBack() {
    let options: NativeTransitionOptions = {
      duration: 300, 
        iosdelay: 300,
      androiddelay: 100,
    }
    console.log(options);
    this.nativePageTransitions.fade(options);
    if(this.status == true)
    {
      this.navigate.navigateRoot("/address-resume");
    }
    else if(this.status == false)
    {
    this.navigate.navigateRoot("/tabs/tabs/profile");
    }
  }

  openEdit() {
    let options: NativeTransitionOptions = {
      duration: 300, 
        iosdelay: 300,
      androiddelay: 100,
    }
    console.log(options);
    this.nativePageTransitions.fade(options);
    this.navigate.navigateRoot("/edit-payment");
  }

  payment()
  {
    console.log("tarjeta");
    this.provider.cardUse = "";
    let e;
    this.presentPopover(e);
    
  }

  async presentPopover(ev: any) {
    const popover = await this.popoverController.create({
      component: PopoverserviceComponent,
      event: ev,
      translucent: false
    });
    return await popover.present();
  }


}
  
