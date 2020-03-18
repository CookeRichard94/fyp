import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  constructor() { }

  getCartTotal(){
     let fakeresponse = "6";
     return Observable.create(
       observer => {
         setTimeout(() =>{
           observer.next(fakeresponse)
         },2000)
       }
     )
  }

  getUserStatus(){
    let fakeresponse = "true";
    return Observable.create(
      observer => {
        setTimeout(() =>{
          observer.next(fakeresponse)
        },2000)
      }
    )
 }

 getProducts(collType){
  let fakeresponse = [{
    'category': "test",
    'scategory': "test",
    'name': "test",
    'price': "500",
    '_id': "123",
  }];
  return Observable.create(
    observer => {
      setTimeout(() =>{
        observer.next(fakeresponse)
      },2000)
    }
  )}

getFilterProducts(collType, filters){
let fakeresponse = [{
    'category': "test",
    'scategory': "test",
    'name': "test",
    'price': "500",
    '_id': "123",
  }];
  return Observable.create(
    observer => {
      setTimeout(() =>{
        observer.next(fakeresponse)
      },2000)
    }
  )
}

setProducts(colltype, formData)
{
  let fakeresponse = "true";
    return Observable.create(
      observer => {
        setTimeout(() =>{
          observer.next(fakeresponse)
        },2000)
      }
    )
}

updateProducts(collType, formData)
{
  let fakeresponse = "true";
    return Observable.create(
      observer => {
        setTimeout(() =>{
          observer.next(fakeresponse)
        },2000)
      }
    )
}
}
