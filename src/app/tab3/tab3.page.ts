import { Component } from '@angular/core';
import { NavController } from "@ionic/angular";
import { NativePageTransitions, NativeTransitionOptions } from '@ionic-native/native-page-transitions/ngx';
import { Parse } from 'parse';
import { AlertController } from "@ionic/angular";
import { BuypinproviderService } from "../buypinprovider.service";
import { LoadingController } from '@ionic/angular';

const parse = require("parse");

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})

export class Tab3Page {
  price: any;
  storeId: any;
  storeName: any;
  searchTerm: any = '';
  product: any;

  cartNumber:any;

  categoryArray:any;

  // values of Cart
  picture: any
  // price: any;
  name: any;
  description: any;
  // storeName: any;
  prodID: any;
  storeID: any;
  prodQuantity: any;
  quantityNumber: number = 1;
  currentPrice: any;
  showPrice: any;
  prodObj: any;
  // cartNumber: any;
  image:any;

  constructor(
    public loadingController: LoadingController,
    public navigate: NavController,
    public nativePageTransitions: NativePageTransitions,
    public alert: AlertController,
    public provider: BuypinproviderService
  ) {
    Parse.initialize("C0XMchZu6Y9XWNUK4lM1UHnnuXhC3dcdpa5fGYpO", "EdN4Xnln11to6pfyNaQ5HD05laenoYu04txYAcfo");
    Parse.serverURL = 'https://parseapi.back4app.com/';
  }

  ngOnInit() {
    
    this.categoryArray =this.provider.storeId.get("Menu");
    console.log(this.categoryArray);
    this.presentLoading();
    this.getProduct();
    this.storeName = this.provider.storeId.get('Name');
   
   
    console.log(this.provider.purchaseCart.length);
    this.cartNumber = this.provider.purchaseCart.length;
  }

  openPage(object) {
    // let options: NativeTransitionOptions = {
    //   duration: 300,
    //   iosdelay: 300
    // }
    // console.log(options);
    // this.nativePageTransitions.fade(options);
    this.provider.itemObject = object;
    this.navigate.navigateRoot("/tabs/tabs/tab4");
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Buscando productos...',
      duration: 2000
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();

    console.log('Loading dismissed!');
    // let e;
    // this.presentPopover(e);
  }

  cartOpen() {
    // let options: NativeTransitionOptions = {
    //   duration: 300,
    //   iosdelay: 300
    // }
    // console.log(options);
    // this.nativePageTransitions.fade(options);
    // this.navigate.navigateRoot("/tabs/tabs/tab5");
    this.navigate.navigateRoot("/address-resume");
  }

  goBack() {
    // let options: NativeTransitionOptions = {
    //   duration: 300,
    //   iosdelay: 300
    // }
    // console.log(options);
    // this.nativePageTransitions.fade(options);
    this.navigate.navigateRoot("/tab2");
  }

  //endpoint para traer poductos
  getProduct() {
    Parse.Cloud.run('getProduct', {
      storeId: this.provider.storeId.id,
      searchTerm: this.searchTerm
    }).then((result) => {
      this.product = result;
      console.log(result);
    }, (error) => {
      console.log(error);
    });
  }

  openHome() {
    // let options: NativeTransitionOptions = {
    //   duration: 300,
    //   iosdelay: 300
    // }
    // console.log(options);
    // this.nativePageTransitions.fade(options);
    this.navigate.navigateRoot("/tab1");
  }

  openProfile() {
    // let options: NativeTransitionOptions = {
    //   duration: 300,
    //   iosdelay: 300
    // }
    // console.log(options);
    // this.nativePageTransitions.fade(options);
    this.navigate.navigateRoot("/tabs/tabs/profile");
  }

  openOthers() {
    // let options: NativeTransitionOptions = {
    //   duration: 300,
    //   iosdelay: 300
    // }
    // console.log(options);
    // this.nativePageTransitions.fade(options);
    this.navigate.navigateRoot("/service-area");
  }

  filter(data)
  {
    console.log(data);

    Parse.Cloud.run("getSub", {
      storeId: this.provider.storeId.id,
      category: data
    }).then((result) => {
      console.log(result);
      this.product = result;
      // this.address = result;
    }, (error) =>{
    console.log(error);
    });
   

  }

  object(data) {

    console.log("DATAAA:",data);
    console.log("IVU", data.get('applyIvu'));
    console.log(data.get('Name'));
    console.log(data.id);
    console.log(data.get('Price'));
    console.log(data.get('picture').url());
    console.log("store id",data.get('storeId').id);
    console.log(data.get('Description'));



    if(this.provider.purchaseCart.length == 0)
    {
      console.log("1");
      this.prodObj = {
        "prodName": data.get('Name'),
        "prodID": data.id,
        "ivu": data.get('applyIvu'),
        "originalPrice": data.get('Price'),
        "prodImage":data.get('picture').url(),
        "prodPrice": data.get('Price'),
        "storeID": data.get('storeId').id,
        "description": data.get('Description'),
        "quantityNumber":1
       };
    }

   else if(this.provider.purchaseCart.length > 0)
    { 
      console.log("no es null");

        for(let i =0; i < this.provider.purchaseCart.length; i ++)
        {
          console.log("entrando al for");
            if(this.provider.purchaseCart[i].storeID === data.get('storeId').id)
            {
              console.log("id Igual");
              this.prodObj = {
                "prodName": data.get('Name'),
                "prodID": data.id,
                "ivu": data.get('applyIvu'),
                "originalPrice": data.get('Price'),
                "prodImage":data.get('picture').url(),
                "prodPrice": data.get('Price'),
                "storeID": data.get('storeId').id,
                "description": data.get('Description'),
                "quantityNumber":1
               };
              this.addToCart();
              // return;
            }
            else if(this.provider.purchaseCart[i].storeID != data.get('storeId').id)
            {
              this.empty("Lo sentimos, no se permite escoger productos de diferentes tiendas.");
              return;
            }
        }
        return;
    }

    
    console.log(this.prodObj);
    this.addToCart();
  }

  async empty(message) {
    const alert = await this.alert.create({
      header: '¡ALERTA!',
      message: message,
      buttons: [{
        text: 'OK',
        role: 'cancel',
        cssClass: 'secondary',
        handler: () => {
          console.log('Confirm Cancel');
          this.navigate.navigateRoot('/tab2');
        }
      }]
    });
    await alert.present();
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


