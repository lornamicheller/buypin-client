import { Component, OnInit } from '@angular/core';
import { NavController } from "@ionic/angular";
import { NativePageTransitions, NativeTransitionOptions } from '@ionic-native/native-page-transitions/ngx';
import { Parse } from 'parse';
import { AlertController } from "@ionic/angular";

let parse = require("parse");

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  username: any;
  password: any;

  constructor(
    public navigate: NavController,
    public nativePageTransitions: NativePageTransitions,
    public alert: AlertController) {
    Parse.initialize("C0XMchZu6Y9XWNUK4lM1UHnnuXhC3dcdpa5fGYpO", "EdN4Xnln11to6pfyNaQ5HD05laenoYu04txYAcfo");
    Parse.serverURL = 'https://parseapi.back4app.com/';
  }

  ngOnInit() {
  }

  openPage() {
    // let options: NativeTransitionOptions = {
    //   duration: 300,
    //   iosdelay: 300
    // }
    // console.log(options);
    // this.nativePageTransitions.fade(options);
    this.navigate.navigateRoot("/register");
  }

  openPage2() {
    // let options: NativeTransitionOptions = {
    //   duration: 300,
    //   iosdelay: 300
    // }
    // console.log(options);
    // this.nativePageTransitions.fade(options);
    this.navigate.navigateRoot("/tab1");
  }

  openPage3() {
    // let options: NativeTransitionOptions = {
    //   duration: 300,
    //   iosdelay: 300
    // }
    // console.log(options);
    // this.nativePageTransitions.fade(options);
    this.navigate.navigateRoot("/forgot-password");
  }

  async empty() {
    const alert = await this.alert.create({
      header: '¡ALERTA!',
      message: 'Todos los campos son requeridos',
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

  async employee() {
    const alert = await this.alert.create({
      header: '¡ALERTA!',
      message: 'Su cuenta esta registrada como driver. Por favor inicie sección en la aplicación BuyPin Driver.',
      buttons: [{
        text: 'OK',
        role: 'cancel',
        cssClass: 'secondary',
        handler: () => {
          console.log('Confirm Cancel');
          this.navigate.navigateRoot("/login");
        }
      }]
    });
    await alert.present();
  }

  signIn() {
    console.log(this.username);
    console.log(this.password);
    if (this.username == null || this.password == null) {
      this.empty();
    } else if(this.username != null && this.password != null) {
      Parse.User.logIn(this.username, this.password).then((resp) => {
        console.log(this.username);
        console.log(this.password);
        console.log('Logged in successfully', resp);
            if(resp.get("role") == "E")
            {
              this.employee();
              return;
            }
        this.openPage2();
      }, err => {
        console.log('Error logging in', err);
      });
    }
  }
}
