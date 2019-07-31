import { Component } from '@angular/core';
import { NavController } from "@ionic/angular";
import { NativePageTransitions, NativeTransitionOptions } from '@ionic-native/native-page-transitions/ngx';
import { Parse } from 'parse';
import { BuypinproviderService } from "../buypinprovider.service";

const parse = require("parse");

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})

export class Tab1Page {
  storeCategory: any;

  constructor(
    public navigate: NavController,
    public nativePageTransitions: NativePageTransitions,
    public provider: BuypinproviderService
  ) { 
    Parse.initialize("C0XMchZu6Y9XWNUK4lM1UHnnuXhC3dcdpa5fGYpO", "EdN4Xnln11to6pfyNaQ5HD05laenoYu04txYAcfo");
    Parse.serverURL = 'https://parseapi.back4app.com/';
  }

  ngOnInit() {
    this.getCategory();
  }

  openPage(object) {
    let options: NativeTransitionOptions = {
      duration: 300,
      iosdelay: 300
    }
    console.log(options);
    this.provider.categoryId = object;
    console.log(this.provider.categoryId);
    this.nativePageTransitions.fade(options);
    this.navigate.navigateRoot("/tab2");
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

  getCategory() {
    const category = Parse.Object.extend("Category");
    const query = new Parse.Query(category);

    query.find().then(result => {
      this.storeCategory = result;
    }, error => {
      console.log(error);
    });
  }

  openHome() {
    let options: NativeTransitionOptions = {
      duration: 300,
      iosdelay: 300
    }
    console.log(options);
    this.nativePageTransitions.fade(options);
    this.navigate.navigateRoot("/tab1");
  }

  openProfile() {
    let options: NativeTransitionOptions = {
      duration: 300,
      iosdelay: 300
    }
    console.log(options);
    this.nativePageTransitions.fade(options);
    this.navigate.navigateRoot("/tabs/tabs/profile");
  }

  openOthers() {
    let options: NativeTransitionOptions = {
      duration: 300,
      iosdelay: 300
    }
    console.log(options);
    this.nativePageTransitions.fade(options);
    this.navigate.navigateRoot("");
  }
}
