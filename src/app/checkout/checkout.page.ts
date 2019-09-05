import { Component, OnInit } from '@angular/core';
import { NavController } from "@ionic/angular";
import { NativePageTransitions, NativeTransitionOptions } from '@ionic-native/native-page-transitions/ngx';
import { PopoverController } from '@ionic/angular';
import { PopoverserviceComponent } from './../popoverservice/popoverservice.component';
import { Parse } from 'parse';
import { AlertController } from "@ionic/angular";

let parse = require("parse");
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.page.html',
  styleUrls: ['./checkout.page.scss'],
})
export class CheckoutPage implements OnInit {

  constructor(public navigate : NavController, public nativePageTransitions: NativePageTransitions,public popoverController: PopoverController) 
  { 
    Parse.initialize("C0XMchZu6Y9XWNUK4lM1UHnnuXhC3dcdpa5fGYpO", "EdN4Xnln11to6pfyNaQ5HD05laenoYu04txYAcfo");
  Parse.serverURL = 'https://parseapi.back4app.com/';
  }

  ngOnInit() {
  }

  // openPage() {
  //   let options: NativeTransitionOptions = {
  //       direction: 'left', 
  //       duration: 400, 
  //       slowdownfactor: -1, 
  //       slidePixels: 20, 
  //       iosdelay: 100
  //   }
  //   console.log(options);
  //   this.nativePageTransitions.slide(options);
  //   this.navigate.navigateRoot("/thankyou-splash");
  // }

  goBack() {
    // let options: NativeTransitionOptions = {
    //   duration: 300, 
    //   iosdelay: 300
    // }
    // console.log(options);
    // this.nativePageTransitions.fade(options);
    this.navigate.navigateRoot("/address-resume");
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
