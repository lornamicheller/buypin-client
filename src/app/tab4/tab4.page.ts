import { Component, OnInit } from '@angular/core';
import { NavController } from "@ionic/angular";
import { NativePageTransitions, NativeTransitionOptions } from '@ionic-native/native-page-transitions/ngx';
import { Parse } from 'parse';
import { AlertController } from "@ionic/angular";
import { BuypinproviderService } from "../buypinprovider.service";

let Parse = require("parse");

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})

export class Tab4Page implements OnInit {
  picture: any
  price: any;
  name: any;
  description: any;
  storeName: any;
  prodID: any;
  storeID: any;
  prodQuantity: any;
  quantityNumber: number = 1;
  currentPrice: any;
  showPrice: any;
  prodObj: any;
  cartNumber: any;
  image:any;
  

  constructor(
    public navigate: NavController,
    public nativePageTransitions: NativePageTransitions,
    public alert: AlertController,
    public provider: BuypinproviderService
  ) {
    Parse.initialize("C0XMchZu6Y9XWNUK4lM1UHnnuXhC3dcdpa5fGYpO", "EdN4Xnln11to6pfyNaQ5HD05laenoYu04txYAcfo");
    Parse.serverURL = 'https://parseapi.back4app.com/';
  }

  ngOnInit() {
    console.log(Parse.User.current());
    this.picture = this.provider.itemObject.get('picture').url();
    this.name = this.provider.itemObject.get('Name');
    this.price = this.provider.itemObject.get('Price');
    this.prodID = this.provider.itemObject.id;
    this.description = this.provider.itemObject.get('Description');
    this.storeName = this.provider.storeId.get('Name');
    this.storeID = this.provider.storeId.id;
    this.showPrice = this.price;
    this.object();
  }

  openPage() {
    let options: NativeTransitionOptions = {
      duration: 300,
      iosdelay: 300
    }
    console.log(options);
    this.nativePageTransitions.fade(options);
    this.navigate.navigateRoot("/tab3");
  }

  cartOpen() {
    let options: NativeTransitionOptions = {
      duration: 300,
      iosdelay: 300
    }
    console.log(options);
    this.nativePageTransitions.fade(options);
    this.navigate.navigateRoot("/tabs/tabs/tab5");
  }

  goBack() {
    let options: NativeTransitionOptions = {
      duration: 300,
      iosdelay: 300
    }
    console.log(options);
    this.nativePageTransitions.fade(options);
    this.navigate.navigateRoot("/tab3");
  }

  object() {

    if(this.quantityNumber == 1)
    {
      console.log("Entre quantity = 1");
      this.prodObj = {
        "prodName": this.name,
        "prodID": this.prodID,
        "originalPrice": this.price,
        "prodImage": this.picture,
        "prodPrice": this.price,
        "storeID": this.storeID,
        "description": this.description,
        "quantityNumber": this.quantityNumber
      };
      console.log(this.prodObj);
    }
    this.prodObj = {
      "prodName": this.name,
      "prodID": this.prodID,
      "originalPrice": this.price,
      "prodImage":this.picture,
      "prodPrice": this.currentPrice.toFixed(2),
      "storeID": this.storeID,
      "description": this.description,
      "quantityNumber": this.quantityNumber
    };
    console.log(this.prodObj);
  }

  incrementValue() {
    if (this.quantityNumber >= 1) {
      this.quantityNumber++;
      this.currentPrice = this.price * this.quantityNumber;
      this.showPrice = this.currentPrice.toFixed(2);
      this.object();
    }
  }

  decrementValue() {
    if (this.quantityNumber > 1) {
      this.quantityNumber--;
      this.currentPrice -= this.price;
      this.showPrice = this.currentPrice.toFixed(2);
      this.object()
    }
  }

  addToCart() {
    console.log(" Entre a add to cart");
    console.log(this.provider.purchaseCart.length);
    if (this.provider.purchaseCart.length != 0) {
      console.log('I am null');

      for (let i = 0; i < this.provider.purchaseCart.length; i++) {
        console.log("Entrando al for");
        // if (this.provider.purchaseCart[i].prodID != this.prodObj.prodID) {
        //   console.log("no hay nada");
        //   this.provider.purchaseCart.push(this.prodObj);
        // }
        // else if (this.provider.purchaseCart[i].prodID == this.prodObj.prodID) {
          
        //     this.provider.purchaseCart[i] = this.prodObj;
      
        // }

        console.log("Array", this.provider.purchaseCart[i].prodID);
        console.log("Object", this.prodObj.prodID);
        if(this.provider.purchaseCart[i].prodID == this.prodObj.prodID)
        {
          console.log("Son iguales los id");
          this.provider.purchaseCart[i] = this.prodObj;
          console.log("new", this.provider.purchaseCart);
          return;
        }

      }
      this.cartNumber = this.provider.purchaseCart.length;
     
    }
    console.log("FUERA");
    this.provider.purchaseCart.push(this.prodObj);
    this.cartNumber = this.provider.purchaseCart.length;
    console.log(this.provider.purchaseCart);
  }
}


