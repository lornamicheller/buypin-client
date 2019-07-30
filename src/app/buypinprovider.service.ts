import { Injectable } from '@angular/core';

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

  purchaseCart: any = [];
  constructor() { }
}
