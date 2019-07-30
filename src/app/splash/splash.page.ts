import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import Parse from 'parse';
import { NativePageTransitions, NativeTransitionOptions } from '@ionic-native/native-page-transitions/ngx';

let parse = require('parse');

@Component({
  selector: 'app-splash',
  templateUrl: './splash.page.html',
  styleUrls: ['./splash.page.scss'],
})
export class SplashPage implements OnInit {

  constructor(public NavCtrl:NavController, public nativePageTransitions: NativePageTransitions) { 
    // parse.serverURL = 'https://parseapi.back4app.com/';
    // Parse.initialize("2lVOPqiL2Ea7bit43NHkjtF0R5UFKxtiUuO8aqnr", "zGjEtvRTwS0a559cBZBvYQjMN58ZxpXNGrKxLfBp");
  }

  ngOnInit() {
    setTimeout(() => {this.goHome();},4200);
    console.log("working");
  }

  goHome() {
    Parse.initialize("C0XMchZu6Y9XWNUK4lM1UHnnuXhC3dcdpa5fGYpO", "EdN4Xnln11to6pfyNaQ5HD05laenoYu04txYAcfo");
    Parse.serverURL = 'https://parseapi.back4app.com/';
    Parse.User.currentAsync().then(user => {
      console.log('Logged user', user);
  
      user != null ? this.NavCtrl.navigateRoot('/tab1') : this.NavCtrl.navigateRoot('/login');
    }, err => {
      console.log('Error getting logged user',err);
      let options: NativeTransitionOptions = {
        duration: 300, 
        iosdelay: 300
       }
       console.log(options);
       this.nativePageTransitions.fade(options);
      });
      
      this.NavCtrl.navigateRoot("/tutorial");
  }

}
