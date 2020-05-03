import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { AngularFireAuth} from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import { auth} from 'firebase';
import {AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection} from '@angular/fire/firestore';
import { take } from 'rxjs/operators';
import { map } from 'rxjs/operators';
import { tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';


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

  getProductDoc(collType, id){
    let docUrl = this.getCollectionUrl(collType)+"/"+id;

    this.itemDoc = this.afs.doc<any>(docUrl);
    return this.itemDoc.valueChanges();
  }

  updateProducts(coll: string, data: any, docId?: any)
  {
    const id = this.afs.createId();
    const item = {id, name};
    const timeStamp = this.timeStamp;
    var docRef = this.afs.collection(this.getCollectionUrl(coll)).doc(data._id);

    return docRef.update(({
      ...data,
      _id: id,
      updatedAt: timeStamp
    }));
  }

  deleteProductDoc(coll: string, docId: string){
   
    console.log("ID: " + docId);
    console.log("COLL: " + coll);
    return this.afs.collection(this.getCollectionUrl(coll)).doc(docId).delete();
  }

  setProductPic(filePath, coll, docId?)
  {
    console.log(filePath)
    console.log(this.getCollectionUrl(coll))
    console.log(docId)

    var docRef = this.afs.collection(this.getCollectionUrl(coll)).doc(docId);
    return docRef.set({
      path:filePath
    }, {merge:true});
  }

  deleteProductPic(coll, docId?)
  {
    var docRef = this.afs.collection(this.getCollectionUrl(coll)).doc(docId);
    return docRef.set({
      path:null
    }, {merge:true});
  }

  createUser(data){
  if (environment.database == 'firebase') {
    
    return this.fAuth.auth.createUserWithEmailAndPassword(data.value.email, data.value.password);
    }
  }

  checkIfUserSignedIn() {
    return this.fAuth.authState;
  }

  getFilterProducts(coll: string, filters) {
    return this.afs.collection(this.getCollectionUrl(coll), ref =>
    ref.where('delete_flag', '==', 'N')
        .where('tags' , 'array-contains', filters)
        .orderBy('tags', 'desc')
  ).valueChanges();
  }

  updateShoppingCart(coll: string, data){
    const id = this.afs.createId();
    const item = { id, name };
    const timestamp = this.timeStamp
    var docRef = this.afs.collection(this.getCollectionUrl(coll)).doc(item.id);
    return docRef.set({
        ...data,
        _id2: id,
        author: this.fAuth.auth.currentUser.uid,
        authorEmail: this.fAuth.auth.currentUser.email,
        updatedAt: timestamp,
        createdAt: timestamp,
        delete_flag: "N",
    });
  }

  getCart(coll: string) {
    this.itemCollection = this.afs.collection<any>(this.getCollectionUrl(coll), ref =>
    ref.where('author', '==', this.fAuth.auth.currentUser.uid)
    );
    return this.itemCollection.valueChanges();
    
}

  setProfile(coll: string, data: any)
  {
    const id = this.afs.createId();
    const item = {id, name};
    const timestamp = this.timeStamp
    var docRef = this.afs.collection(this.getCollectionUrl(coll)).doc(item.id);
    return docRef.set({
      ...data,
      _id2: id,
      author: this.fAuth.auth.currentUser.uid,
      authorEmail: this.fAuth.auth.currentUser.email,
      updatedAt: timestamp,
      createdAt: timestamp,
      delete_flag: "N",
  });
  }

}
