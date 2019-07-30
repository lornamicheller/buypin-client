import { Component, OnInit } from '@angular/core';
import { NavController } from "@ionic/angular";
import { NativePageTransitions, NativeTransitionOptions } from '@ionic-native/native-page-transitions/ngx';
import { BuypinproviderService } from "../buypinprovider.service";

@Component({
  selector: 'app-tab5',
  templateUrl: './tab5.page.html',
  styleUrls: ['./tab5.page.scss'],
})

export class Tab5Page implements OnInit {

  constructor(
    public provider: BuypinproviderService,
    public navigate: NavController,
    public nativePageTransitions: NativePageTransitions
  ) { }

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


  ngOnInit() {
    this.cartNumber = this.provider.purchaseCart.length;
    this.products = this.provider.purchaseCart;
    this.updatePrices();
  }

  incrementValue(data) {
    this.originalPrice = data.originalPrice;
    this.prodImage = data.prodImage;
    this.prodName = data.prodName;

    console.log(data);
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
      "prodImage": this.prodImage,
      "prodPrice": newPrice,
      "storeID": data.storeID,
      "description": data.description,
      "quantityNumber": quant
    };
    console.log(this.prodObj);
  }

  decrementValue(data) {
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
    let options: NativeTransitionOptions = {
      duration: 300,
      iosdelay: 300
    }
    console.log(options);
    this.nativePageTransitions.fade(options);
    this.navigate.navigateRoot("/add-address");
  }

  work() {
    let options: NativeTransitionOptions = {
      duration: 300,
      iosdelay: 300
    }
    console.log(options);
    this.nativePageTransitions.fade(options);
    this.navigate.navigateRoot("/add-address");
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

  updatePrices() {
    //get product price values
    let price =0;
    this.startingSubtotal =0;
    for(let i =0; i < this.provider.purchaseCart.length; i ++)
    {
      this.startingSubtotal += parseFloat(this.provider.purchaseCart[i].prodPrice);
      price = this.startingSubtotal;
      
    }
    this.startingSubtotal = price;
    console.log("Starting Price", price);
    
    //add up all product values
    // this.extraSavings = Math.floor((this.startingSubtotal / 0.1) * 100);
    //add additonal costs to price

    //display final total
  }
}
