import { Component, OnInit } from '@angular/core';
import { NavController } from "@ionic/angular";
import { NativePageTransitions, NativeTransitionOptions } from '@ionic-native/native-page-transitions/ngx';

@Component({
selector: 'app-service-area',
templateUrl: './service-area.page.html',
styleUrls: ['./service-area.page.scss'],
})
export class ServiceAreaPage implements OnInit {

constructor(public navigate: NavController, public nativePageTransitions: NativePageTransitions) { }

ngOnInit() {
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

}