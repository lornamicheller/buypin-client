import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { NativePageTransitions, NativeTransitionOptions } from '@ionic-native/native-page-transitions/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { LocationAccuracy } from '@ionic-native/location-accuracy/ngx';
import { AlertController } from '@ionic/angular';
@Component({
  selector: 'app-location',
  templateUrl: './location.page.html',
  styleUrls: ['./location.page.scss'],
})

export class LocationPage implements OnInit {
data:any;
  constructor(
    public navigate: NavController,
    public nativePageTransitions: NativePageTransitions,
    public geolocation: Geolocation,
    public locationAccuracy: LocationAccuracy,
    public alert:AlertController
  ) { }

  ngOnInit() {
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
      this.empty(JSON.stringify(resp));
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
      this.empty(JSON.stringify(data));
    });
    console.log('location enabled');
    this.openPage();
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

}
