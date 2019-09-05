import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { NativePageTransitions, NativeTransitionOptions } from '@ionic-native/native-page-transitions/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { LocationAccuracy } from '@ionic-native/location-accuracy/ngx';
import { Parse } from 'parse';
import { AlertController } from "@ionic/angular";

let parse = require("parse");
@Component({
  selector: 'app-location',
  templateUrl: './location.page.html',
  styleUrls: ['./location.page.scss'],
})

export class LocationPage implements OnInit {
data:any;
status:any;

  constructor(
    public navigate: NavController,
    public nativePageTransitions: NativePageTransitions,
    public geolocation: Geolocation,
    public locationAccuracy: LocationAccuracy,
    public alert:AlertController
  ) {   Parse.initialize("C0XMchZu6Y9XWNUK4lM1UHnnuXhC3dcdpa5fGYpO", "EdN4Xnln11to6pfyNaQ5HD05laenoYu04txYAcfo");
  Parse.serverURL = 'https://parseapi.back4app.com/';}

  ngOnInit() {
    this.status = true;
    this.enableLocation();
  }

  openPage() {
    const options: NativeTransitionOptions = {
      duration: 300,
      iosdelay: 300
    };
    console.log(options);
    this.nativePageTransitions.fade(options);
    this.navigate.navigateRoot('/tab1');
  }

  goBack() {
    const options: NativeTransitionOptions = {
      duration: 300,
      iosdelay: 300
    };
    console.log(options);
    this.nativePageTransitions.fade(options);
    this.navigate.navigateRoot('/register');
  }

  enableLocation() {
    console.log('entrando al location');
    this.locationAccuracy.canRequest().then((canRequest: boolean) => {
      if (canRequest) {
        // the accuracy option will be ignored by iOS
        this.locationAccuracy.request(this.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY).then(
          () => console.log('Request successful') ,
          error => console.log('Error requesting location permissions', error)
        );
      }
    });

    this.geolocation.getCurrentPosition().then((resp) => {
      console.log(resp);
      console.log(resp.coords.latitude);
      console.log(resp.coords.longitude);

      

      // this.empty(JSON.stringify(resp));
      // resp.coords.latitude
      // resp.coords.longitude
      // this.data = 'Lat: ' + resp.coords.latitude + '<br>' + 'Lng: ' + resp.coords.longitude;
    }).catch((error) => {
      console.log('Error getting location', error);
    });

    const watch = this.geolocation.watchPosition();
    watch.subscribe((data) => {
      // data can be a set of coordinates, or an error (if an error occurred).
      // data.coords.latitude
      // data.coords.longitude
      console.log('data', data);
      this.setGeoPoint(data.coords.latitude, data.coords.longitude);
      // this.empty(JSON.stringify(data));
    });
    console.log('location enabled');
    // this.openPage();
  }

  async empty(message) {
    const alert = await this.alert.create({
      header: '¡ALERTA!',
      message: message,
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

  setGeoPoint(latitude,longitude)
  {
    Parse.Cloud.run('insetGeoPoint', {
      userId: Parse.User.current().id,
      latitud: latitude,
      longitud: longitude
    }).then((result) => {

      console.log("Coordenadas Grabadas");
      this.status= false;
    }, (error) => {
      console.log(error);
    });
  }

}
