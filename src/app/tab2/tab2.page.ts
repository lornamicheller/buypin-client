import { Component } from '@angular/core';
import { NavController } from "@ionic/angular";
import { NativePageTransitions, NativeTransitionOptions } from '@ionic-native/native-page-transitions/ngx';
import { Parse } from 'parse';
import { AlertController } from "@ionic/angular";
import * as moment_ from 'moment';
import { BuypinproviderService } from "../buypinprovider.service";


let parse = require("parse");
const moment = moment_;

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})

export class Tab2Page {
  stores: any;
  categoryName: any;
  categoryId: any;
  weekDay: any;
  hourDay: any;
  schedule: any;
  status: any;
  storePhone: any;
  statusText :any;

  constructor(
    public navigate: NavController,
    public nativePageTransitions: NativePageTransitions,
    public provider: BuypinproviderService,
    public alertCtrl:AlertController
  ) {
    Parse.initialize("C0XMchZu6Y9XWNUK4lM1UHnnuXhC3dcdpa5fGYpO", "EdN4Xnln11to6pfyNaQ5HD05laenoYu04txYAcfo");
    Parse.serverURL = 'https://parseapi.back4app.com/';
  }

  ngOnInit() {
    console.log(Parse.User.current().id);
    this.getStores();
    this.categoryName = this.provider.categoryId.get('name');

    this.time();
    this.currentDate();
  }

  openPage(object) {
    let options: NativeTransitionOptions = {
      duration: 300,
      iosdelay: 300
    }
    console.log(options);
    this.provider.storeId = object;
    console.log(this.provider.storeId);
    this.nativePageTransitions.fade(options);
    this.navigate.navigateRoot("/tab3");
  }

  transitionBack() {
    let options: NativeTransitionOptions = {
      duration: 300,
      iosdelay: 300
    }
    console.log(options);
    this.nativePageTransitions.fade(options);
    this.navigate.navigateRoot('tabs/tabs/tab1');
  }

  cartOpen() {
    let options: NativeTransitionOptions = {
      duration: 300,
      iosdelay: 300
    }
    console.log(options);
    this.nativePageTransitions.fade(options);
    this.navigate.navigateRoot("/tabs/tabs/tab5");
  }

  currentDate() {
    let current = Date.now();
    console.log(current);
    let day = new Date(current);
    var d = new Date();
    var weekday = new Array(7);
    weekday[0] = "Sunday";
    weekday[1] = "Monday";
    weekday[2] = "Tuesday";
    weekday[3] = "Wednesday";
    weekday[4] = "Thursday";
    weekday[5] = "Friday";
    weekday[6] = "Saturday";

    var n = weekday[d.getDay()];
    this.weekDay = n;
    // console.log(n);
    let hour = moment(day, 'DD/MM/YYYY HH:mm').format('h:mm A');
    this.hourDay = hour;
    // console.log(hour);
  }

  getStores() {
    Parse.Cloud.run('getStores', {
      categoryId: this.provider.categoryId.id
    }).then((result) => {
      console.log(result);
      if(result == null || result == '')
      {
        this.statusText = true;
      }
      this.stores = result;
    }, (error) => {
      console.log(error);
    });
  }

  getDayWork(schedule) {
    // console.log(schedule);
    for (let i = 0; i < schedule.length; i++) {
      if (this.weekDay == schedule[i].day) {
        // console.log("Es el mismo ", schedule[i].day);

        //start Hour
        let hourstart = moment(schedule[i].start, 'h:mm A').format('YYYY-MM-DD h:mm A');
        let start = Date.parse(hourstart);
        let startDate = new Date(start);
        // console.log(startDate);
        // console.log("START", start);

        //end hour
        let hourend = moment(schedule[i].end, 'h:mm A').format('YYYY-MM-DD h:mm A');
        // console.log(hourend);
        let end = Date.parse(hourend);
        let endDate = new Date(end);
        // console.log(endDate);
        // console.log("END", end);

        // // current hour 
        // console.log("current hour", this.hourDay);
        let currentHour = moment(this.hourDay, 'h:mm A').format('YYYY-MM-DD h:mm A');
        // console.log(currentHour);
        let curr = Date.parse(currentHour);
        let current = new Date(curr);
        this.errorAlert(curr);
        
        // console.log(current);
        // console.log("CURR", curr);

        //condition
        if (curr > start && curr < end) {
          // console.log("Estas en el range", schedule[i].start + " - " + schedule[i].end);
          return true;
        }
        else {
          return false;
        }
      }
    }
  }

  startHour(start) {
    // console.log(start);
    for (let i = 0; i < start.length; i++) {
      if (this.weekDay == start[i].day) {
        return start[i].start;
      }
    }
    return null;
    // let final = start.start;
  }

  endHour(end) {
    for (let i = 0; i < end.length; i++) {
      if (this.weekDay == end[i].day) {
        return end[i].end;
      }
    }
    return null;
  }

  // openHome() {
  //   let options: NativeTransitionOptions = {
  //     duration: 300,
  //     iosdelay: 300
  //   }
  //   console.log(options);
  //   this.nativePageTransitions.fade(options);
  //   this.navigate.navigateRoot("/tab1");
  // }

  openProfile() {
    let options: NativeTransitionOptions = {
      duration: 300,
      iosdelay: 300
    }
    console.log(options);
    this.nativePageTransitions.fade(options);
    this.navigate.navigateRoot("/tabs/tabs/profile");
  }

  openOthers() {
    let options: NativeTransitionOptions = {
      duration: 300,
      iosdelay: 300
    }
    console.log(options);
    this.nativePageTransitions.fade(options);
    this.navigate.navigateRoot("");
  }

  time() {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentDay = currentDate.getDay();
    const currentHour = currentDate.getHours();
    const currentMinute = currentDate.getMinutes();

    // setInterval(this.openClose, 5000);
    // this.openClose();
  }

  async errorAlert(error : any){
    const alert =  await this.alertCtrl.create({
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

  formatPhone(phone) {
    var digits = ("" + phone).split("");
    let juice = digits.slice(0, 3).join("") + "-" + digits.slice(3, 6).join("") + "-" + digits.slice(6).join("");

    return juice;
  }
}
