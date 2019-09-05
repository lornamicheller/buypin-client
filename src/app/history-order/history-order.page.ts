import { Component, OnInit } from '@angular/core';
import { NativePageTransitions, NativeTransitionOptions } from '@ionic-native/native-page-transitions/ngx';
import { NavController } from "@ionic/angular";
import { Parse } from 'parse';
import { LoadingController } from '@ionic/angular';
import { BuypinproviderService } from "../buypinprovider.service";
import { AlertController } from "@ionic/angular";

let parse = require("parse");
@Component({
  selector: 'app-history-order',
  templateUrl: './history-order.page.html',
  styleUrls: ['./history-order.page.scss'],
})
export class HistoryOrderPage implements OnInit {

  constructor(public provider: BuypinproviderService,public loadingController: LoadingController,private nativePageTransitions: NativePageTransitions, public navigate : NavController) 
  {
    Parse.initialize("C0XMchZu6Y9XWNUK4lM1UHnnuXhC3dcdpa5fGYpO", "EdN4Xnln11to6pfyNaQ5HD05laenoYu04txYAcfo");
    Parse.serverURL = 'https://parseapi.back4app.com/';
   }

   services:any;
   total =0;
   subtotal =0;
   count=0;
   date:any;
   time:any;


  ngOnInit() {

    this.getInfo();
    // window.setInterval(function() {
      
    //   // self.getLocation();
    //  // this.getLocation();
    //  }, 2000);
  }

  cancel(service2)
  {
    console.log(service2);

    // cancel service

    service2.set('status', 'C');

    // save change

    service2.save().then(result =>
      {
        console.log("Resultado", result);
          this.presentLoading();
      })

  }

  openCarInfo(serviceData) {
    // let options: NativeTransitionOptions = {
    //   duration: 300,
    //   iosdelay: 300
    // }
    // console.log(options);
    // this.nativePageTransitions.fade(options);
    console.log(serviceData);
    console.log(serviceData.get('driverId'));
    this.provider.driverObjectId = serviceData.get('driverId');
    this.provider.serviceObject = serviceData;
    this.navigate.navigateRoot("/card-info");
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Cancelando...',
      duration: 4000
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();

    console.log('Loading dismissed!');
 
    this.ngOnInit();

  }

  getInfo()
  {
    Parse.Cloud.run('getHistory', {
      user: Parse.User.current().id
    }).then((result) => {
      console.log(result);
      this.services = result;
      console.log(this.services);
      this.date = result[4].get('date');
      console.log(this.date);
      // this.transformhour();

      // for(let i =0; i < result.length; i ++ )
      // {   console.log(result[i].get('orderTotal'));
      //     // this.subtotal += result[i].orderTotal;

      //     // this.count = this.subtotal;
      //     // console.log(this.count);
      // }
      // this.total = this.count;
      // console.log(this.total);
      
    }, (error) => {
      // this.errorAlert(error);
      console.log(error);
    });
  }

//   makeIteration()
//   {
//     var date = new Date(this.date);
//       // console.log(date.getTime());
//     var x = setInterval(function() {
     
  
//       let dateNow = Date.now();
//       // console.log(dateNow);
//       let dateNow2 = new Date(dateNow);
//       // console.log("difference", dateNow - date.getTime());
  
//     //   var distance  = dateNow - date.getTime()
//     // for(let i =0; i< this.date.length; i ++)
//     // {
      
//     // }
//   };
// }





  // transformhour()
  // {
  //   var date = new Date(this.date);
  //   // console.log(date.getTime());
  // var x = setInterval(function() {
   

  //   let dateNow = Date.now();
  //   // console.log(dateNow);
  //   let dateNow2 = new Date(dateNow);
  //   // console.log("difference", dateNow - date.getTime());

  //   var distance  = dateNow - date.getTime()

  //   var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  //   var seconds = Math.floor((distance % (1000 * 60)) / 1000);

   

  //   console.log(minutes + "m " + seconds + "s ");
  //   this.time = minutes + "m " + seconds + "s ";

  //   if(minutes > 3)
  //   {
  //     console.log("RIp");
  //     return;
  //   }
  //   else if ( minutes < 3 && minutes > 0)
  //   {
  //     document.getElementById("clock").innerHTML = minutes + "m " + seconds + "s ";
      
  //   }

    
  //   if (distance < 0) {
  //  clearInterval(x);
  //   }
   
  //  }, 1000);
   
  // }



  
  goBack() {
    // let options: NativeTransitionOptions = {
    //   duration: 300, 
    //     iosdelay: 300,
    //   androiddelay: 100,
    // }
    // console.log(options);
    // this.nativePageTransitions.fade(options);
    this.navigate.navigateRoot("/tabs/tabs/profile");
  }

  changeStatusIteration(status)
  {
      if(status == "R")
      {
        return "Solicitado";
      }
      if(status == 'C')
      {
        return "Cancelado";
      }
      if(status == "A")
      {
        return "Aprobado";
      }
      if(status == "IP")
      {
        return "En Proceso";
      }
      if(status == "F")
      {
        return "Finalizado";
      }
      if(status == "FR")
      {
        return "Reseña";
      }
  }

}
