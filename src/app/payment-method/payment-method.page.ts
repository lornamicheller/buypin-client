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
import { LoadingController } from '@ionic/angular';
import * as moment_ from 'moment';
const moment = moment_;

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

  totalCharge:any;
  address:any;

  constructor(public loadingController: LoadingController,public popoverController: PopoverController,public provider: BuypinproviderService,private stripe:Stripe,private nativePageTransitions: NativePageTransitions, public navigate : NavController, public alert:AlertController) {
    Parse.initialize("C0XMchZu6Y9XWNUK4lM1UHnnuXhC3dcdpa5fGYpO", "EdN4Xnln11to6pfyNaQ5HD05laenoYu04txYAcfo");
    Parse.serverURL = 'https://parseapi.back4app.com/';
   }

  ngOnInit() {
    this.getCards();
    this.address = this.provider.addressObject2;
    // this.makeServiceRequest();
    console.log(this.provider.currentLocation);
    this.totalCharge = this.provider.totalCharge;
    console.log(this.totalCharge);

    // console.log("ALL PARAMS");
    // console.log("amount", this.provider.totalCharge);
    // // console.log("customerId",card.customer);
    // // console.log("description", this.provider.addressObject.get('notes'));
    // // console.log("cardId", card.id);
    // console.log("userId",Parse.User.current().id);
    // console.log("total", this.provider.totalCharge);
    // console.log("deliveryFee", this.provider.deliveryFee);
    // console.log("extraSavings", this.provider.extraSavings);
    // console.log("storeId", this.provider.storeId);
    // // console.log("address", this.provider.addressObject.id);
    // console.log("tax", this.provider.tax);
    // console.log("subtotal", this.provider.subtotal);


    console.log("FINISH PARAMS");

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
    // let options: NativeTransitionOptions = {
    //   duration: 300, 
    //     iosdelay: 300,
    //   androiddelay: 100,
    // }
    // console.log(options);
    // this.nativePageTransitions.fade(options);
    if(this.status == true)
    {
      this.navigate.navigateRoot("/tabs/tabs/tab5");
    }
    else if(this.status == false)
    {
    this.navigate.navigateRoot("/tabs/tabs/profile");
    }
  }

  async presentAlertConfirm(card) {
    let self = this;
    const alert = await this.alert.create({
      header: '¿Estás seguro que deseas borrar esta tarjeta de crédito?',
      buttons: [
        {
          text: 'Sí',
          role: 'camera',
          cssClass: 'secondary',
          handler: (blah) => {
           self.deleteCard(card);
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'No',
          handler: () => {
            // this.openLibrary();
            
            console.log('Confirm Okay');
          }
        }
      ]
    });

    await alert.present();
  }

  openEdit() {
    // let options: NativeTransitionOptions = {
    //   duration: 300, 
    //     iosdelay: 300,
    //   androiddelay: 100,
    // }
    // console.log(options);
    // this.nativePageTransitions.fade(options);
    this.navigate.navigateRoot("/edit-payment");
  }

  payment()
  {
    console.log("tarjeta");
    this.provider.cardUse = "";
    let e;
    this.presentPopover(e);
    
  }


  makePayment(card)
  {
    console.log("Payment");

    console.log("ALL PARAMS");
    console.log("amount", parseFloat(this.provider.totalCharge));
    console.log("customerId",card.customer);
    // console.log("description", this.provider.addressObject[0].get('notes'));
    console.log("cardId", card.id);
    console.log("userId",Parse.User.current().id);
    console.log("total", parseFloat(this.provider.totalCharge));
    console.log("deliveryFee", this.provider.deliveryFee);
    console.log("extraSavings", this.provider.extraSavings);
    console.log("storeId", this.provider.storeId.id);
    console.log("address", this.provider.addressObject2.id);
    console.log("tax", this.provider.tax);
    console.log("subtotal", this.provider.subtotal);

    if(this.provider.extraSavings == null )
    {
      this.provider.extraSavings = 0.00;
    }
    
      Parse.Cloud.run("charge", {
        //charge params
        amount: parseFloat(this.provider.totalCharge),
        customerId: card.customer,
        // description:this.provider.addressObject[0].get('notes'),
        cardId:card.id,
        //other
        userId:Parse.User.current().id,
        total: parseFloat(this.provider.totalCharge),
        deliveryFee:this.provider.deliveryFee,
        extraSavings:this.provider.extraSavings,
        storeId:this.provider.storeId.id,
        addressId:this.provider.addressObject2.id,
        tax: this.provider.tax,
        subtotal: this.provider.subtotal

      }).then((result) => {
      console.log(result);
      console.log("Delete!!!");
      //  this.deleteAlert();
      // this.ngOnInit();
      console.log("New Payment");
      this.makeServiceRequest();
      },
    
      (error)=>{
        console.log(error);
      });


  }

  makeServiceRequest()
  {
    let date = Date.now();
    console.log(date);
    let newDate = new Date(date);
    console.log(newDate);
    let hour = moment(newDate, 'DD/MM/YYYY HH:mm').format('DD/MM/YYYY h:mm A');
    console.log(hour);

    //items
    //store
    //notes
    //subtotal
    // subtotal
    // total
    // extraSavings
    // userId
    // dateTime
    //deliveryFee
    //status
    //addressId
    //driverId
let e;
    console.log("Make Payments Params")
    console.log(this.provider.purchaseCart)
    console.log(this.provider.storeId.id)
    // console.log(this.provider.addressObject[0].get('notes'))
    console.log(this.provider.subtotal)
    console.log(parseFloat(this.provider.totalCharge))
    console.log(this.provider.extraSavings)
    console.log( Parse.User.current().id)
    console.log(hour)
    console.log(this.provider.deliveryFee)
    // console.log( this.provider.addressObject[0].id)
    console.log("Make Payments Params")


    console.log("END");

    Parse.Cloud.run("createServiceRequest", {
      items: this.provider.purchaseCart,
      storeId: this.provider.storeId.id,
      // notes: this.provider.addressObject[0].get('notes'),
      subtotal: this.provider.subtotal,
      total: parseFloat(this.provider.totalCharge),
      extraSavings: this.provider.extraSavings,
      userId: Parse.User.current().id,
      dateTime: hour,
      deliveryFee: this.provider.deliveryFee,
      status: "R",
      tax:this.provider.tax,
      addressId: this.provider.addressObject2.id,
      latitud:this.provider.lat,
      longitud: this.provider.long,
    }).then((result) => {
     console.log(result);
     console.log("Delete!!!");
    //  this.deleteAlert();
    this.presentLoading();
    
    },
   
    (error)=>{
      console.log(error);
    });
  

  }




  async presentPopover(ev: any) {
    const popover = await this.popoverController.create({
      component: PopoverserviceComponent,
      event: ev,
      translucent: false
    });
    return await popover.present();
  }

  deleteCard(card)
  {
    console.log(card);
    Parse.Cloud.run("stripeDeleteCard", {
      customerId: card.customer,
      cardId: card.id
    }).then((result) => {
     console.log(result);
     console.log("Delete!!!");
    //  this.deleteAlert();
    this.ngOnInit();
    },
   
    (error)=>{
      console.log(error);
    });
  }

  //  test loading

  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Procesando orden...',
      duration: 4000
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();

    console.log('Loading dismissed!');
    let e;
    this.presentPopover(e);
  }

 


}
  
