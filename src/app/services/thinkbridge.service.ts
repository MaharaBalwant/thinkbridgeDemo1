import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ThinkbridgeService {

  constructor(
    private http: HttpClient
  ) { }

  getItems() {
    return this.http.get('./assets/data.json');
  }

  addNewItem(payloadObj) {
    let localData:any = JSON.parse(localStorage.getItem('dataSource'));
    localData.push(payloadObj);
    localStorage.setItem("dataSource", JSON.stringify(localData));
    return true;
  }

  updateItem(payloadObj) {
    let localData:any = JSON.parse(localStorage.getItem('dataSource'));
    let index = localData.findIndex(item => (item.id == payloadObj.id));
    localData[index].name = payloadObj.name;
    localData[index].discription = payloadObj.discription;
    localStorage.setItem("dataSource",JSON.stringify(localData));
    return true;
  }

  deleteItem(id) {
    let localData:any = JSON.parse(localStorage.getItem('dataSource'));
    let newlocalData:any = localData.filter(item => (item.id != id));
    localStorage.setItem("dataSource",JSON.stringify(newlocalData));
    return true;
  }


}
