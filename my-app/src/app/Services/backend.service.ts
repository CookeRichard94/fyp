import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFireAuth} from '@angular/fire/auth';
import { auth} from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  constructor(public fAuth: AngularFireAuth) { }

  login()
  {
    this.fAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());
  }

  logout()
  {
    this.fAuth.auth.signOut();
  }










  //FAKE -- DELETE WHEN NEW CREATED
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
    let fakeresponse = true;
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

setProducts(collType, formData)
{
  let fakeresponse = true;
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
  let fakeresponse = true;
    return Observable.create(
      observer => {
        setTimeout(() =>{
          observer.next(fakeresponse)
        },2000)
      }
    )
}

getProductDoc(collType, id){
  let fakeresponse = {
    'category': "test",
    'scategory': "test",
    'name': "test",
    'price': "500",
    '_id': "123",
  };
  return Observable.create(
    observer => {
      setTimeout(() =>{
        observer.next(fakeresponse)
      },2000)
    }
  )
}

deleteProductDoc(collType, id){
  let fakeresponse = true;
    return Observable.create(
      observer => {
        setTimeout(() =>{
          observer.next(fakeresponse)
        },2000)
      }
    )
}

updateShopping(collType, data){
  let fakeresponse = true;
  return Observable.create(
    observer => {
      setTimeout(() =>{
        observer.next(fakeresponse)
      },2000)
    }
  )
}

updateShoppingCart(collType, data){
  let fakeresponse = true;
  return Observable.create(
    observer => {
      setTimeout(() =>{
        observer.next(fakeresponse)
      },2000)
    }
  )
}


}
