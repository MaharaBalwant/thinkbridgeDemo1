import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ThinkbridgeService } from './../services/thinkbridge.service';
import { map, catchError, retry } from 'rxjs/operators';

@Component({
  selector: 'app-thinkbridge',
  templateUrl: './thinkbridge.component.html',
  styleUrls: ['./thinkbridge.component.scss']
})
export class ThinkbridgeComponent implements OnInit {

  itemList:any;
  modalFlag:boolean;
  modalId:number;
  modalData:any;
  itemForm:any;

  constructor(
    private _fb:FormBuilder,
    private dataService:ThinkbridgeService
  ) { }

  ngOnInit(): void {
    this.modalFlag = false;
    this.getItems();
  }

  getItems() {
    let localData:any = localStorage.getItem('dataSource');
    if(localData) {
      this.itemList = JSON.parse(localData);
    } else {
      this.dataService.getItems()
      .subscribe(response=>{
        this.itemList = response;
        localStorage.setItem('dataSource', JSON.stringify(this.itemList));
      });
    }
  }

  addNewItem() {
    this.itemFormInit();
    this.modalId = 1;
    this.modalFlag = true;
  }

  editItemDetails(id): void {
    this.itemFormInit();
    this.modalId = 2;
    this.modalFlag = true;
    this.modalData = this.filterItemDataFromListing(id,this.itemList);
    this.patchItemForm(this.modalData);
  }

  deleteItem(id): void {
    this.modalId = 3;
    this.modalFlag = true;
    this.modalData = this.filterItemDataFromListing(id,this.itemList);
  }

  deleteItemData(id): void {
    var responseFlag:boolean = false;
    this.modalData = this.filterItemDataFromListing(id,this.itemList);
    responseFlag = this.dataService.deleteItem(id);
    if (responseFlag==true) {
      this.getItems();
      this.modalFlag = false;
    }
  }

  saveFormData() {
    this.validateAllFormFields();
    var responseFlag:boolean = false;
    if(this.itemForm.valid) {
      let formData:any = this.itemForm.getRawValue();
      let id:number = (this.modalId===2)?formData.id:this.findNextId(this.itemList);
      let payloadObj:any = this.payloadObj(id,formData);
      if (this.modalId===2) {
        responseFlag = this.dataService.updateItem(payloadObj);
        if (responseFlag==true) {
          this.getItems();
          this.modalFlag = false;
        }
      } else {
        responseFlag = this.dataService.addNewItem(payloadObj);
        if (responseFlag==true) {
          this.getItems();
          this.modalFlag = false;
        }
      }
    }
  }

  closeForm(): void {
    this.modalFlag = false;
  }

  filterItemDataFromListing(id, dataArr) {
    return dataArr.find(item => item.id===id);
  }

  itemFormInit() {
    this.itemForm = this._fb.group({
      id:'',
      name:['',Validators.required],
      discription:['',Validators.required]
    });
  }

  patchItemForm(data) {
    this.itemForm.patchValue({
      id:data.id,
      name:data.name,
      discription:data.discription
    });
  }

  payloadObj(id,formData) {
    return {
      "id":id,
      "name":formData.name,
      "discription":formData.discription
    };
  }

  validateAllFormFields(){
    var fieldsControls = this.itemForm.controls;
    for (let field in fieldsControls) {
      const control = this.itemForm.get(field);
      control.markAsTouched({ onlySelf: true });
    }
  }

  fieldValid(field:string) {
    return !this.itemForm.get(field).valid && this.itemForm.get(field).touched;
  }

  findNextId(data) {
    var max:number = 0;
    var num;
    data.forEach(element => {
      num = element.id;
      if(num>max) {
        max = num;
      }
    });
    return max+1;
  }

}
