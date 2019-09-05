import { Component } from '@angular/core';
import { NavController } from "@ionic/angular";
import { NativePageTransitions, NativeTransitionOptions } from '@ionic-native/native-page-transitions/ngx';
import { Parse } from 'parse';
import { AlertController } from "@ionic/angular";
import * as moment_ from 'moment';
import { BuypinproviderService } from "../buypinprovider.service";
import { LoadingController } from '@ionic/angular';

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



  scheduleArray:any;

 schedule2:any;

  constructor(
    public loadingController: LoadingController,
    public alert: AlertController,
    public navigate: NavController,
    public nativePageTransitions: NativePageTransitions,
    public provider: BuypinproviderService
  ) {
    Parse.initialize("C0XMchZu6Y9XWNUK4lM1UHnnuXhC3dcdpa5fGYpO", "EdN4Xnln11to6pfyNaQ5HD05laenoYu04txYAcfo");
    Parse.serverURL = 'https://parseapi.back4app.com/';
  }

  ngOnInit() {

    console.log(this.provider.categoryId);
    this.presentLoading();
    
    this.scheduleArray = [];
    console.log(Parse.User.current().id);
    this.getStores();
    // this.getSchedule("EHKmWFAydO");

   
    
    this.categoryName = this.provider.categoryId.get('name');

    this.time();
    this.currentDate();
    
    console.log("date:", new Date());
    
    
   
   
   
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Buscando...',
      duration: 2000
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();

    console.log('Loading dismissed!');
    // let e;
    // this.presentPopover(e);
  }


  openPage(object) {
    // let options: NativeTransitionOptions = {
    //   duration: 300,
    //   iosdelay: 300
    // }
    // console.log(options);
    this.provider.storeId = object;
    console.log(this.provider.storeId);
    // this.nativePageTransitions.fade(options);
    this.navigate.navigateRoot("/tab3");
  }

  transitionBack() {
    // let options: NativeTransitionOptions = {
    //   duration: 300,
    //   iosdelay: 300
    // }
    // console.log(options);
    // // this.nativePageTransitions.fade(options);
    this.navigate.navigateRoot('tabs/tabs/tab1');
  }

  cartOpen() {
    // let options: NativeTransitionOptions = {
    //   duration: 300,
    //   iosdelay: 300
    // }
    // console.log(options);
    // this.nativePageTransitions.fade(options);
    this.navigate.navigateRoot("/tabs/tabs/tab5");
  }

  getSchedule(id)
  {
    var data;

    console.log(id);
    Parse.Cloud.run('getSchedule', {
      storeId: id
    }).then((result) => {
       this.scheduleArray.push(result);
    //  console.log("Schedule",result);
    }, (error) => {
      console.log(error);
    });

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
    console.log(this.weekDay);
    // console.log(n);
    let hour = moment(day, 'DD/MM/YYYY HH:mm').format('h:mm A');
    this.hourDay = hour;
    // console.log(hour);
  }

  setDay(data)
  {
    var date= new Date();
    console.log(this.scheduleArray.length);
    Parse.Cloud.run('verifySchedule', {
      storeId:data,
      currentDay:this.weekDay,
      currentHour: date
    }).then((result) => {
      console.log("SETTTTT: ",result);
        // return result;
        console.log(result);
        if(result == true)
        {
          document.getElementById('cerrado').style.display = "none";
          document.getElementById('abierto').style.display ="show";
        
        }
        else if (result == false)
        {
          document.getElementById('abierto').style.display = "none";
          document.getElementById('cerrado').style.display = "show";
        }
      
    }, (error) => {
      console.log(error);
    });

  }

  getStores() {
    Parse.Cloud.run('getStores', {
      categoryId: this.provider.categoryId.id,
    }).then((result) => {
      console.log(result);
      if(result == null || result == '')
      {
        this.statusText = true;
      }
      this.stores = result;
      console.log(this.stores[0].data.get("Name"));
      // console.log("lenght", this.stores.length);

      // this.iterationSchedule(this.stores);


       
      
    }, (error) => {
      console.log(error);
    });
  }

  iterationSchedule(iter)
  {
    console.log(iter);

    for(let i =0; i < iter.length; i ++)
    {
      console.log("Iteration", i);
    // this.getSchedule(iter[i].id);
    this.setDay(iter.id);

    }
    // console.log(this.scheduleArray);
    // console.log(this.scheduleArray.length);
    // this.setDay();
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

  openHome() {
    // let options: NativeTransitionOptions = {
    //   duration: 300,
    //   iosdelay: 300
    // }
    // console.log(options);
    // this.nativePageTransitions.fade(options);
    this.navigate.navigateRoot("/tab1");
  }

  goBack()
  {
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

  time() {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentDay = currentDate.getDay();
    const currentHour = currentDate.getHours();
    const currentMinute = currentDate.getMinutes();

    // setInterval(this.openClose, 5000);
    // this.openClose();
  }

  formatPhone(phone) {
    var digits = ("" + phone).split("");
    let juice = digits.slice(0, 3).join("") + "-" + digits.slice(3, 6).join("") + "-" + digits.slice(6).join("");
     
    return juice;
  }

  // async errorAlert(error : any){
  //   const alert =  await this.alert.create({
  //     header: 'Error',
  //     message: error,
  //     buttons: [{
  //       text: 'OK',
  //       role: 'cancel',
  //       cssClass: 'secondary',
  //       handler: () => {
  //         console.log('Confirm Cancel');
  //       }
  //     }]
  //   });
  //   await alert.present();
  // }

}
