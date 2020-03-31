import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { AngularFireAuth} from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import { auth} from 'firebase';
import {AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection} from '@angular/fire/firestore';
import { take } from 'rxjs/operators';
import { map } from 'rxjs/operators';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BackendService {
  private itemDoc: AngularFirestoreDocument<any>;
  private itemCollection: AngularFirestoreCollection<any>;
  item: Observable<any>;

  constructor(public fAuth: AngularFireAuth, private afs: AngularFirestore) { }

  login(loginType, formData?)
  {
    //this.fAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());

    if(formData)
    {
      return this.fAuth.auth.signInWithEmailAndPassword(formData.email, formData.password);
    }
    else{
      let loginMethod;
      if(loginType == "GOOGLE")
      {
        loginMethod = new firebase.auth.GoogleAuthProvider();
      }
      return this.fAuth.auth.signInWithRedirect(loginMethod);
    }
  }

  logout()
  {
    return this.fAuth.auth.signOut();
  }

  redirectLogin()
  {
    return this.fAuth.auth.getRedirectResult();
  }

  getDoc(collUrl: string)
  {
    this.itemDoc = this.afs.doc<any>(collUrl);

    return this.itemDoc.valueChanges();
  }

  isUserLoggedIn(): Observable<boolean>
  {
    return from(this.fAuth.authState)
    .pipe(take(1))
    .pipe(map(state => !!state))
    .pipe(tap(authenticated =>{
      return authenticated;
    }));

  }

  isAdmin()
  {
    let collUrl = !this.isUserLoggedIn() ? "Not Logged in": this.fAuth.auth.currentUser.uid;
    collUrl = "fyp/ecommerce/admins/" + collUrl;
    return this.getDoc(collUrl);
  }

  getProducts(coll: string, filters?: any)
  {
    this.itemCollection = this.afs.collection<any>(this.getCollectionUrl(coll));
    return this.itemCollection.valueChanges();
  }

  setProducts(coll: string, data: any, docId?: any)
  {
    const id = this.afs.createId();
    const item = {id, name};
    const timeStamp = this.timeStamp;
    var docRef = this.afs.collection(this.getCollectionUrl(coll)).doc(item.id);

    return docRef.set(({
      ...data,
      _id: id,
      updatedAt: timeStamp,
      createdAt: timeStamp,
      delete_flag: "N"
    }));

  }

  get timeStamp()
  {
    var d = new Date();
    return d;
  }

  getCollectionUrl(filter)
  {
    return "fyp/ecommerce/" + filter;
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
