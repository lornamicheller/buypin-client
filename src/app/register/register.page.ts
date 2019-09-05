import { Component, OnInit } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { NavController } from '@ionic/angular';
import { NativePageTransitions, NativeTransitionOptions } from '@ionic-native/native-page-transitions/ngx';
import { Parse } from 'parse';
import { AlertController } from '@ionic/angular';
import { BuypinproviderService } from './../../app/buypinprovider.service';

const parse = require('parse');

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  name: any;
  fullName: any;
  lastName: any;
  firstName: any;
  email: any;
  password: any;
  confirmPass: any;
  role: any;
  picture: any;
  savedPhoto: any;
  changeInformation: any;
  photo: any;

  constructor(
    private camera: Camera,
    public alert: AlertController,
    public navigate: NavController,
    public nativePageTransitions: NativePageTransitions,
    public provider: BuypinproviderService
  ) {

    this.role = 'C';

    Parse.initialize('C0XMchZu6Y9XWNUK4lM1UHnnuXhC3dcdpa5fGYpO', 'EdN4Xnln11to6pfyNaQ5HD05laenoYu04txYAcfo');
    Parse.serverURL = 'https://parseapi.back4app.com/';
  }

  ngOnInit() {

  }

  openCamera() {
    const options: CameraOptions = {
      quality: 50,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    };

    this.camera.getPicture(options).then((imageData) => {
      this.picture = 'data:image/jpeg;base64,' + imageData;

      const base64Image = this.picture;
      const name = 'photo.jpeg';

      const parseFile = new Parse.File(name, {
        base64: base64Image
      }); // convierte la foto a base64
      parseFile.save().then((savedFile) => {
        console.log('file saved:' + savedFile);
        this.savedPhoto = savedFile;


        this.provider.photo = savedFile; // foto tomada
      }, (err) => {
        console.log('error grabando file: ' + err);
      });

    },
      (err) => {
        console.log('error de camara' + err);
        alert(err);
      });
  }

  openLibrary() {
    const options: CameraOptions = {
      quality: 50,
      targetWidth: 900,
      targetHeight: 600,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      saveToPhotoAlbum: false,
      allowEdit: true
    };

    const self = this;

    this.camera.getPicture(options).then((imageData) => {
      self.picture = 'data:image/jpeg;base64,' + imageData;
    //  this.alertl(JSON.stringify(imageData));
      //self.changeInformation.set('', self.picture);
      const base64Image = self.picture;
      const name = 'photo.jpeg';
      const parseFile = new Parse.File(name, {
        base64: base64Image
      });
      // convierte la foto a base64
      parseFile.save().then((savedFile) => {
        console.log('file saved:' + savedFile);

        this.savedPhoto = savedFile;

      }, (err) => {
        console.log('error grabando file: ' + err);
        alert(err);
      });
    }, (err) => {
      console.log('error de camara' + err);
      alert(err);
    });
  }

  openPage() {
    const options: NativeTransitionOptions = {
      duration: 300,
      iosdelay: 300
    };
    console.log(options);
    this.nativePageTransitions.fade(options);
    this.navigate.navigateRoot('/location');
  }

  openPage2() {
    const options: NativeTransitionOptions = {
      duration: 300,
      iosdelay: 300
    };
    console.log(options);
    this.nativePageTransitions.fade(options);
    this.navigate.navigateRoot('/login');
  }

  goBack() {
    const options: NativeTransitionOptions = {
      duration: 300,
      iosdelay: 300
    };
    console.log(options);
    this.nativePageTransitions.fade(options);
    this.navigate.navigateRoot('/login');
  }

  signUserUp() {
    console.log(this.fullName);
    console.log(this.email);
    console.log(this.password);
    console.log(this.confirmPass);
    const user = new Parse.User();

    if (this.password !== this.confirmPass) {
      this.notEqual();
    } else if (this.firstName == null || this.firstName == '' || this.lastName == null || this.lastName == '' || this.email == null || this.email == '' || this.password == null || this.password =='' || this.confirmPass== null || this.confirmPass == '' || this.savedPhoto == null) {
      this.empty();
    } else {
      user.set('firstName', this.firstName);
      user.set('lastName', this.lastName)
      user.set('email', this.email);
      user.set('password', this.password);
      user.set('username', this.email);
      user.set('role', "C");
      user.set('profilePic', this.savedPhoto);
      user.set('fullName', this.firstName + ' ' + this.lastName);
      user.signUp().then((user) => {
        console.log('User logged in', user);
        this.openPage();
      }).catch((error) => {
        console.log(error);
        return false;
      });
      return true;
    }
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

  async notEqual() {
    const alert = await this.alert.create({
      header: '¡ALERTA!',
      message: 'Las contraseñas no coinciden',
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

  async alertl(err) {
    const alert = await this.alert.create({
      header: '¡ALERTA!',
      message: err,
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

  async presentAlertConfirm() {
    const alert = await this.alert.create({
      header: 'Foto de Perfil',
      subHeader: '',
      buttons: [
        {
          text: 'Cámara',
          role: 'camera',
          cssClass: 'secondary',
          handler: (blah) => {
            this.openCamera();
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Galería',
          handler: () => {
            this.openLibrary();
            console.log('Confirm Okay');
          }
        },
        {
          text: 'Cancel',
          handler: () => {
            console.log('Confirm Okay');
          }
        }
      ]
    });
    await alert.present();
  }

}
