import { Component, OnInit } from '@angular/core';
import { NativePageTransitions, NativeTransitionOptions } from '@ionic-native/native-page-transitions/ngx';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-thankyou-splash',
  templateUrl: './thankyou-splash.page.html',
  styleUrls: ['./thankyou-splash.page.scss'],
})
export class ThankyouSplashPage implements OnInit {

  constructor(public NavCtrl:NavController, public nativePageTransitions: NativePageTransitions) { }

  ngOnInit() {
    setTimeout(() => {this.goHome();},4200);
    console.log("working");
  }

  goHome() {
    // Parse.User.currentAsync().then(user => {
    //   console.log('Logged user', user);
  
    //   user != null ? this.NavCtrl.navigateRoot('/tutorial') : this.NavCtrl.navigateRoot('/tutorial');
    // }, err => {
    //   console.log('Error getting logged user',err);
    //   let options: NativeTransitionOptions = {
    //     direction: 'left',
    //     duration: 200,
    //     slowdownfactor: -1,
    //     slidePixels: 20,
    //     iosdelay: 100, 
    //     androiddelay: 100,
    //    }
    //   });
   this.NavCtrl.navigateRoot("/tab1");
  }
}
