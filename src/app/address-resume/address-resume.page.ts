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
    console.log(this.getUserAddress());
    this.getUserAddress();
    this.name = Parse.User.current().get('fullName')
  }

  openPage(object) {
    let options: NativeTransitionOptions = {
      duration: 300,
      iosdelay: 300
    }
    console.log(options);
    this.provider.nameAdrrs = object;
    this.nativePageTransitions.fade(options);
    this.provider.currentLocation = "Checkout";
    this.addNote();
    this.navigate.navigateRoot("/payment-method");
  }

  goBack() {
    let options: NativeTransitionOptions = {
      duration: 300,
      iosdelay: 300
    }
    console.log(options);
    this.nativePageTransitions.fade(options);
    this.navigate.navigateRoot("/shipping-address");
  }

  getUserAddress() {
    //end-point para añadir la direccion del usuario
    console.log(Parse.User.current().id);
    Parse.Cloud.run('getAddress', {
      userId: Parse.User.current().id,
    }).then((result) => {
      console.log(result[0].get('Address') + "\n" + result[0].get('apt') + "\n" + result[0].get('placeName') + "\n" + result[0].get('state'));
      this.address = result[0].get('Address')
      this.apt = result[0].get('apt')
      this.city = result[0].get('placeName')
      this.state = result[0].get('state');
      // console.log(this.address);
      // this.product = result;
      console.log(result);
    }, (error) => {
      console.log(error);
    });
  }

  addNote() { // TODO -- not working *****************
    console.log("we in add note boys");
    
    const userId = Parse.User.current().id
    console.log("we in add note boys");
    Parse.Cloud.run('setNotes', {
      userId: this.userId,
      notes: this.notes
    }).then((result) => {
      console.log("Note added")
      console.log(result);
    }, (error) => {
      // this.errorAlert(error);
      console.log(error);
    });
    console.log(this.notes);
  }
}
