import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Stripe } from '@ionic-native/stripe/ngx';
import { NativePageTransitions, NativeTransitionOptions } from '@ionic-native/native-page-transitions/ngx';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { PopoverserviceComponent } from './popoverservice/popoverservice.component';
import { LocationAccuracy } from '@ionic-native/location-accuracy/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
// import { Stripe } from '@ionic-native/stripe/ngx';

@NgModule({
  declarations: [
    AppComponent,
    PopoverserviceComponent
  ],

  entryComponents: [ PopoverserviceComponent ],

  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule
  ],

  providers: [
    StatusBar,
    SplashScreen,
    Camera,
    Stripe,
    NativePageTransitions,
    PopoverserviceComponent,
    LocationAccuracy,
    Geolocation,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],

  bootstrap: [AppComponent]
})

export class AppModule { }
