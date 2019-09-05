import {
  Component,
  OnInit
} from '@angular/core';
import {
  MenuController
} from '@ionic/angular';
import {
  NavController
} from '@ionic/angular';

import * as mapboxgl from 'mapbox-gl';
import {
  NativePageTransitions,
  NativeTransitionOptions
} from '@ionic-native/native-page-transitions/ngx';

import {
  PopoverController
} from '@ionic/angular';

import MapboxDirections from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions';
import * as MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
// import { NativeGeocoder} from '@ionic-native/native-geocoder/ngx';
import {
  Geolocation
} from '@ionic-native/geolocation/ngx';
import {
  AlertController
} from "@ionic/angular";
import { Location } from "@angular/common";
import { BuypinproviderService } from "../buypinprovider.service";



//let mapboxDirections = require('@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions');
let MapboxGeocoder = require('@mapbox/mapbox-gl-geocoder');


@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})
export class MapPage implements OnInit {

  mapMark: mapboxgl.Map;
  mapboxgl:any;
  require : any;
  service : string;
  
  constructor(
    public alert:AlertController,
    public menu: MenuController,
    private nav : NavController, public grupovider : BuypinproviderService,
    public nativePageTransitions: NativePageTransitions, public popover : PopoverController,
    private geolocation: Geolocation) {

    this.service = this.grupovider.service; //igualando lo que esta en el provider
    mapboxgl.accessToken = 'pk.eyJ1IjoiYnV5cGluIiwiYSI6ImNqejIxZHdsYzAxa2YzYnFsMHl2NTc4NGIifQ.qYMTOKLl1NR_AUjYxHUEyg';

    }

  ngOnInit() {
    this.loadMap();
    this.getLocation();
  }

  loadMap(){
   

    this.mapMark = new mapboxgl.Map({
      container: 'mapMark',
      style: 'mapbox://styles/jrosario241/cjsuqzyev4cip1fo3cv5c3vr5',
     // zoom: 13,
      //center: [this.lng, this.lat]
    });

    // this.mapMark = new mapboxgl.Map({
    //   container: 'mapMark',
    //   style: 'mapbox://styles/jrosario241/cjsuqzyev4cip1fo3cv5c3vr5',
    //  // zoom: 13,
    //   //center: [this.lng, this.lat]
    // });
    
    console.log(this.mapMark);

    this.mapMark.dragRotate.disable();
    const geolocate = new mapboxgl.GeolocateControl({
      positionOptions: {
        enableHighAccuracy: true
      },
      trackUserLocation: true
    });
    
    this.mapMark.addControl(geolocate);

    this.mapMark.on('load', function () {
      geolocate.trigger();
    });

   }

  navigate(){
    let options: NativeTransitionOptions = {
      duration: 200,
      iosdelay: 100,
      androiddelay: 100,
     }
  console.log('transition');
    this.nativePageTransitions.fade(options);
    this.nav.navigateRoot("/tabs/tabs/tab5");

  }

  changePage(){ //funcion que cambia el servicio

    let options: NativeTransitionOptions = {
      duration: 200,
      iosdelay: 100,
      androiddelay: 100,
     }

  console.log('transition');
    this.nativePageTransitions.fade(options);
    console.log(this.service);
    this.grupovider.service = this.service;
    console.log(this.grupovider.service);
    //this.presentPopover();
    this.nav.navigateRoot("/payment-method");
    //service = this.grupovider.service;
    //console.log(service);
  }

  getLocation(){

    let data;
    this.geolocation.getCurrentPosition().then((resp) => {
      this.grupovider.lat = resp.coords.latitude;
      this.grupovider.long = resp.coords.longitude;
    
      console.log(this.grupovider.lat);
      console.log(this.grupovider.long);
     }).catch((error) => {
       console.log('Error getting location', error);
     });
     console.log(this.grupovider.lat);
      console.log(this.grupovider.long);
      this.errorAlert(this.grupovider.lat + " " + this.grupovider.long);
    console.log('Notas: ' + this.grupovider.messageNotes);
  }

  async errorAlert(error : any){
    const alert =  await this.alert.create({
      header: 'Error',
      message: error,
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
