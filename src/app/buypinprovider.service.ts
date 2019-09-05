import { Injectable } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

@Injectable({
  providedIn: 'root'
})
export class BuypinproviderService {
  photo: any;
  storeId: any;
  categoryId: any;
  itemObject: any;
  nameAdrrs: any;
  usrAddress: any;
  cardId:any;
  currentLocation:any;
  cardUse:any;

  totalCharge:any;
  addressObject:any;

  deliveryFee:any;
  extraSavings:any;
  tax:any;
  subtotal:any;
  flag:any;

  purchaseCart: any = [];

  // other variables
  mapboxgl: any;
  map: mapboxgl.Map;
  public service: string;
  public pop: boolean;
  result: string;
  name: string;
  error: any;

  email: string;
  phoneNumber: string;
  nombre: string;
  verified: boolean;
  licenseNum: any;
  profilePic: any;
  role: string;
  password: string;
  username: string;
  code: any
  user: any;
  verificationCode: any;
  currentUser: any;

  userLat: any;
  userLong: any;

  lat: number;
  long: number;

  car : any;

  price : number;
  messageNotes : string;
  selectedCar:any;
  // selectedCard:any;
  total : number;
  card : any;
  lugar: string; //lugar que se guarda en el servicio de grua
 
  destination: any;
  distance: number;
  precioMilla: any;
  time: any;
  serviceId: any;

  initialLatitud: any;
  initialLongitud: any;
  initialName: any;
  finalName: any;

  objectSpecial:any;

  whatUser: boolean = false; //distingue si el usuario tiene un request procesado o es un cliente nuevo: false==no tiene ningun request
  requestQuantity : number;
  selectedRequest: any;
  requests : any;

  addressObject2:any;

  addresStatus:any;

  serviceObject:any;
  driverObjectId:any;


  ///////////




  constructor() { }
}
