import { Component, OnInit } from '@angular/core';
import { NavController } from "@ionic/angular";
import { NativePageTransitions, NativeTransitionOptions } from '@ionic-native/native-page-transitions/ngx';
import { Parse } from 'parse';
import { AlertController } from "@ionic/angular";


const parse = require('parse');

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})

export class SearchPage implements OnInit {
  search: any;

  constructor(
    public navigate: NavController,
    public nativePageTransitions: NativePageTransitions,
    public alert: AlertController
  ) { 
    Parse.initialize("C0XMchZu6Y9XWNUK4lM1UHnnuXhC3dcdpa5fGYpO", "EdN4Xnln11to6pfyNaQ5HD05laenoYu04txYAcfo");
    Parse.serverURL = 'https://parseapi.back4app.com/';
  }

  ngOnInit() {
  }

  buttonClick() {
    // let options: NativeTransitionOptions = {
    //   duration: 300,
    //   iosdelay: 300
    // }
    // console.log(options);
    // this.nativePageTransitions.fade(options);
    this.navigate.navigateRoot("/tab3");
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

  getResults() {
    if (this.search === null) {
      this.empty();
    }
    try {
      Parse.Products.getProduct(this.search).then((response) => {
        console.log(response);
      });
    } catch (error) {
      alert(error);
    }
  }
}