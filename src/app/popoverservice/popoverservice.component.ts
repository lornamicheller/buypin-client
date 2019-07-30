import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { NavController } from "@ionic/angular";
import { NativePageTransitions, NativeTransitionOptions } from '@ionic-native/native-page-transitions/ngx';


@Component({
  selector: 'app-popoverservice',
  templateUrl: './popoverservice.component.html',
  styleUrls: ['./popoverservice.component.scss'],
})
export class PopoverserviceComponent implements OnInit {

  constructor(public navigate : NavController, public nativePageTransitions: NativePageTransitions, public popoverController: PopoverController) { }

  ngOnInit() {}

 openPage() {
    let options: NativeTransitionOptions = {
      duration: 300, 
      iosdelay: 300
    }
    console.log(options);
    this.nativePageTransitions.fade(options);
    this.navigate.navigateRoot("/tab1");
    this.DismissClick();
  }

  async DismissClick() {
    await this.popoverController.dismiss();
      }

}
