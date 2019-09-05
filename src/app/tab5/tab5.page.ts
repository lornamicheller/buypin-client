import { Component, OnInit } from '@angular/core';
import { NavController } from "@ionic/angular";
import { AlertController } from "@ionic/angular";
import { NativePageTransitions, NativeTransitionOptions } from '@ionic-native/native-page-transitions/ngx';
import { BuypinproviderService } from "../buypinprovider.service";
import { Parse } from 'parse';
let parse = require("parse");

@Component({
  selector: 'app-tab5',
  templateUrl: './tab5.page.html',
  styleUrls: ['./tab5.page.scss'],
})

export class Tab5Page implements OnInit {

  constructor(
    public alert : AlertController,
    public provider: BuypinproviderService,
    public navigate: NavController,
    public nativePageTransitions: NativePageTransitions
  ) {    Parse.initialize("C0XMchZu6Y9XWNUK4lM1UHnnuXhC3dcdpa5fGYpO", "EdN4Xnln11to6pfyNaQ5HD05laenoYu04txYAcfo");
  Parse.serverURL = 'https://parseapi.back4app.com/'; }

  cartNumber: any;
  products;
  showPrice: any;
  prodObj: any;
  originalPrice: any;
  prodImage: any;
  prodName: any;
  startingSubtotal: any;
  extraSavings: any; // 10% savings (para probar) ???
  subtotal: any;
  deliveryFee: any = 3.99; // para probar ???
  taxes: any;
  orderTotal: any;
  total:any;

  //get value 
  deliveryFeeDat:any;

  taxPrice:any;

  ivuStatus:any;

  ivuPrice:any;

  subtotalLabel:any;


  ngOnInit() {
    this.getDeliveryFee();
    console.log(" Addess Object ", this.provider.addressObject2.get("zipcode"));
    this.cartNumber = this.provider.purchaseCart.length;
    this.products = this.provider.purchaseCart;
    // this.updatePrices();
  }

  goBack()
  {
    this.navigate.navigateRoot("/address-resume");
  }

 async getDeliveryFee()
  {
    this.deliveryFee = await Parse.Cloud.run('getDeliveryFee', {
        zipcode: this.provider.addressObject2.get("zipcode")
      });

      
      console.log("DELIVERY FEE:", this.deliveryFee);

        if(this.deliveryFee == null)
        {
            this.zipcodeAlert();
        }
        else if (this.deliveryFee != null)
        {
          this.deliveryFeeDat = this.deliveryFee.get("deliveryFee");
          this.updatePrices();
        }


  }

  async zipcodeAlert() {
    const alert = await this.alert.create({
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

  async presentAlertConfirm(product) {
    let self = this;
    const alert = await this.alert.create({
      header: '¿Estás seguro que deseas borrar este artículo del carrito?',
      buttons: [
        {
          text: 'Sí',
          role: 'camera',
          cssClass: 'secondary',
          handler: (blah) => {
           self.deleteElement(product);
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

  async decrementDelete(product) {
    let self = this;
    const alert = await this.alert.create({
      header: '¿Estás seguro que deseas borrar este artículo del carrito?',
      buttons: [
        {
          text: 'Sí',
          role: 'camera',
          cssClass: 'secondary',
          handler: (blah) => {
           self.deleteElement(product);
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

  incrementValue(data) {
    this.originalPrice = data.originalPrice;
    this.prodImage = data.prodImage;
    this.prodName = data.prodName;

    console.log(data);
    console.log("IVUUU", data.ivu);
    console.log(data.quantityNumber);
    let price = data.originalPrice;
    let quant = data.quantityNumber + 1;
    console.log(quant);
    let newPrice = price * quant;
    this.showPrice = newPrice.toFixed(2);

    console.log("Nuevo Precio: ", newPrice);
    console.log(this.provider.purchaseCart);

    this.object(newPrice, data, quant);

    // if(this.provider.purchaseCart[0].prodID == data.prodID)
    // {
    //   console.log("son iguales");
    // }

    for (let i = 0; i < this.provider.purchaseCart.length; i++) {
      if (this.provider.purchaseCart[i].prodID == data.prodID) {
        this.provider.purchaseCart[i] = this.prodObj;

        console.log("son iguales");
      }
    }
    this.cartNumber = this.provider.purchaseCart.length;
    this.updatePrices();
  }

  object(newPrice, data, quant) {
    this.prodObj = {
      "prodName": this.prodName,
      "prodID": data.prodID,
      "originalPrice": this.originalPrice,
      "ivu": data.ivu,
      "prodImage": this.prodImage,
      "prodPrice": newPrice,
      "storeID": data.storeID,
      "description": data.description,
      "quantityNumber": quant
    };
    console.log(this.prodObj);
  }

  changeStringToFloat(price)
  {
      return parseFloat(price).toFixed(2);
  }

  decrementValue(data) {


      if(data.quantityNumber == 1)
      {
          this.decrementDelete(data);
          return;
      }
      


    this.originalPrice = data.originalPrice;
    this.prodImage = data.prodImage;
    this.prodName = data.prodName;

    console.log(data);
    console.log(data.quantityNumber);
    let price = data.originalPrice;
    let quant = data.quantityNumber - 1;
    console.log(quant);
    let newPrice = price * quant;
    this.showPrice = newPrice.toFixed(2);

    newPrice = this.showPrice;

    console.log("Nuevo Precio: ", newPrice);
    console.log(this.provider.purchaseCart);

    this.object(newPrice, data, quant);
    // if(this.provider.purchaseCart[0].prodID == data.prodID)
    // {
    //   console.log("son iguales");
    // }

    for (let i = 0; i < this.provider.purchaseCart.length; i++) {
      if (this.provider.purchaseCart[i].prodID == data.prodID) {
        this.provider.purchaseCart[i] = this.prodObj;

        console.log("son iguales");
      }
    }
    this.cartNumber = this.provider.purchaseCart.length;
    this.updatePrices();
  }

  deleteElement(product) {
    // console.log("EN LA PUTA FUNCION");

    console.log(product);

    for (let i = 0; i < this.provider.purchaseCart.length; i++) {
      if (this.provider.purchaseCart[i].prodID == product.prodID) {
        this.provider.purchaseCart.splice(i, 1);
        console.log("Elementos borrados");
      }
      this.cartNumber = this.provider.purchaseCart.length;
      this.updatePrices();
    }
  }

  openPage() {
    // let options: NativeTransitionOptions = {
    //   duration: 300,
    //   iosdelay: 300
    // }
    // console.log(options);
    // this.nativePageTransitions.fade(options);
    this.provider.totalCharge = this.total;
   
      // console.log(Parse.User.current().id);
      // Parse.Cloud.run('getAddress', {
      //   userId: Parse.User.current().id,
      // }).then((result) => {
        
      //   if(result != null  || result != '')
      //   {
      //     console.log("Hay address");
      //     this.provider.flag = true;
      //     this.navigate.navigateRoot('/address-resume');
      //     return;
      //   }
      //   else if(result == null || result == '' )
      //   {
      //     this.provider.flag = false;
      //     this.navigate.navigateRoot('/add-address');
      //     return;
      //   }
        
        
      //   console.log(result);
      // }, (error) => {
      //   console.log(error);
      // });
  
    
    this.navigate.navigateRoot("/payment-method");

  }

  work() {
    // let options: NativeTransitionOptions = {
    //   duration: 300,
    //   iosdelay: 300
    // }
    // console.log(options);
    // this.nativePageTransitions.fade(options);
    this.navigate.navigateRoot("/add-address");
  }

  cartOpen() {
    // let options: NativeTransitionOptions = {
    //   duration: 300,
    //   iosdelay: 300
    // }
    // console.log(options);
    // this.nativePageTransitions.fade(options);
    this.navigate.navigateRoot("/tabs/tabs/tab5");
  }

  updatePrices() {
    //get product price values
    let price =0;
    let noIvuPrice =0;
    let noIvu =0;

    this.startingSubtotal =0;
    console.log("Products:", this.provider.purchaseCart);

    for(let i =0; i < this.provider.purchaseCart.length; i ++)
    {
      if(this.provider.purchaseCart[i].ivu == false)
      {
        console.log("no lleva ivu");
        noIvu += parseFloat(this.provider.purchaseCart[i].prodPrice);
        noIvuPrice = noIvu;
        console.log("NO IVU PRICE:",noIvuPrice);
        this.ivuStatus = true;
      }
      else if(this.provider.purchaseCart[i].ivu == true)
      { 
        this.startingSubtotal += parseFloat(this.provider.purchaseCart[i].prodPrice);
        price = this.startingSubtotal;
        console.log("IVU", price);

      }
     

      
      
    }
    // price += noIvuPrice;
    // console.log("PRICE + IVU", price);
    this.ivuPrice = noIvuPrice;
    this.subtotalLabel = price + noIvuPrice;
    this.startingSubtotal = price;  
    // this.deliveryFee = 3.99;
    this.taxes = 0.115;
    let taxesIninitial = this.taxes *this.startingSubtotal;
    this.taxPrice = taxesIninitial;
    this.orderTotal = (taxesIninitial + this.deliveryFee.get("deliveryFee") + this.startingSubtotal);
    console.log("Taxes:", taxesIninitial);
    console.log("delivery fee: ",  this.deliveryFee.get("deliveryFee"));
    console.log("Subtoal", this.startingSubtotal);
    console.log("this.orderTotal", this.orderTotal);
    let order = this.orderTotal;
    
    console.log(this.orderTotal);
    let totalPrice= order;

    if(noIvuPrice > 0)
    {
      console.log("Total Price:",totalPrice);
      console.log("NO IVU PRICE:", noIvuPrice);
      this.orderTotal = totalPrice + noIvuPrice;
      console.log("PRICE + IVU", this.orderTotal);
    }
    else if ( noIvuPrice == 0)
    {
      this.orderTotal = totalPrice;
      this.ivuStatus = false;
      console.log("PRICE", this.orderTotal);
    }
    
    
    console.log(this.orderTotal);
    this.total = this.orderTotal;
    

    this.provider.tax = this.taxes;
    this.provider.extraSavings = this.extraSavings;
    this.provider.deliveryFee =  this.deliveryFee.get("deliveryFee");
    this.provider.totalCharge = this.total;
    this.provider.subtotal = this.subtotalLabel;

    //add up all product values
    // this.extraSavings = Math.floor((this.startingSubtotal / 0.1) * 100);
    //add additonal costs to price

    //display final total
  }
}
