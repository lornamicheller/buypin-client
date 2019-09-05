import { Component, OnInit } from '@angular/core';
import { NavController } from "@ionic/angular";
import { NativePageTransitions, NativeTransitionOptions } from '@ionic-native/native-page-transitions/ngx';
import { Parse } from 'parse';
import { AlertController } from "@ionic/angular";
import { BuypinproviderService } from "../buypinprovider.service";

let parse = require("parse");

@Component({
  selector: 'app-address-resume',
  templateUrl: './address-resume.page.html',
  styleUrls: ['./address-resume.page.scss'],
})

export class AddressResumePage implements OnInit {
  notes: any;
  address: any;
  name: any;
  userId: any;
  apt: any;
  city: any;
  state: any; 
  objectAddress:any;
  address2:any;
  storeId:any;
  storeZipCode:any;
  
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
    this.storeId = this.provider.purchaseCart[0].storeID;
    console.log(Parse.User.current());
    console.log(this.getUserAddress());
    this.getUserAddress();
    this.getStoreZipCode();
    this.name = Parse.User.current().get('fullName')
  }

  getStoreZipCode()
  {
    Parse.Cloud.run('getStoreZipCode', { //get the user store
      storeId:"on2wYAFUyA"
    }).then (result => {
    console.log(" Store ZipCodes",result);
    this.storeZipCode = result;
    }, (error) => {
    console.log(error);
    });

  }

async  openPage(address) {
    console.log("Address" , address);
    
    //verify ZipCode

    var result = await this.verifyZipCode(address);

    if(result == null)
    {
      this.zipcodeAlert();
      console.log("Null");
    }
    else if( result == true)
    {
      // console.log("true");
      this.provider.nameAdrrs = this.objectAddress;
      this.provider.addressObject2 = address;
  
      this.provider.currentLocation = "Checkout";
      // this.navigate.navigateRoot("/payment-method");
      this.navigate.navigateRoot("/tabs/tabs/tab5");
    }
   
    

    
  }

  verifyZipCode(address)
  {
    for(let i =0; i < this.storeZipCode.length; i ++)    
    {
      if(address.get('zipcode') == this.storeZipCode[i])
      {
       return true;
      }

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

  goBack() {
    // let options: NativeTransitionOptions = {
    //   duration: 300,
    //   iosdelay: 300
    // }
    // console.log(options);
    // this.nativePageTransitions.fade(options);
    // if(this.provider.flag == true)
    // {
      this.navigate.navigateRoot('/tab3');
    // }
    // else if ( this.provider.flag == false)
    // {
    //   this.navigate.navigateRoot("/shipping-address");
    // }
    
  }

  getUserAddress() {
    //end-point para añadir la direccion del usuario
    console.log(Parse.User.current().id);
    Parse.Cloud.run('getAddress', {
      userId: Parse.User.current().id,
    }).then((result) => {

      this.address2 = result;

      // if(result == null)
      // {
      //   this.navigate.navigateRoot('/add-address');
      // }

      // this.objectAddress = result;
      // console.log(this.objectAddress);
      // console.log(result[0].get('Address') + "\n" + result[0].get('apt') + "\n" + result[0].get('placeName') + "\n" + result[0].get('state'));
      // this.address = result[0].get('Address')
      // this.apt = result[0].get('apt')
      // this.city = result[0].get('placeName')
      // this.state = result[0].get('state');
      // console.log(this.address);
      // this.product = result;
      console.log(result);
    }, (error) => {
      console.log(error);
    });
  }

  addNote() {

    if(this.notes == null || this.notes == '' )
    {console.log("es null");

    this.provider.addressObject = this.objectAddress;
      // this.openPage();

      return;
    }
 
    else if ( this.notes != null || this.notes != '')
    {
      Parse.Cloud.run('setNotes', {
        userId: Parse.User.current().id,
        notes: this.notes
      }).then((result) => {
        console.log("Note added");
        this.provider.addressObject = this.objectAddress;
        console.log(result);
        // this.openPage();
      }, (error) => {
        // this.errorAlert(error);
        console.log(error);
      });
      console.log(this.notes);

    }
   
  }

  goToAddress()
  {
      this.provider.addresStatus = "Add";
    this.navigate.navigateRoot('/shipping-address');

  }

  addNoteTest() {
    var serviceRequest = Parse.Object.extend('ServiceRequest');
    var query = new serviceRequest(serviceRequest);

    query.set('notes', this.notes);

    query.save().then(result => {
      console.log(result);
    }, error => {
      console.log(error);
    });
  }
}
