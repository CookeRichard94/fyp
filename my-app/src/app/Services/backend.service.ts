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

  // import firebase auth and store
  constructor(public fAuth: AngularFireAuth, private afs: AngularFirestore) { }

  //method to log user in using firebase
  login(loginType, formData?)
  {
    if(formData)
    {
      //If form data is present use email and password log in by passing these as parameters
      return this.fAuth.auth.signInWithEmailAndPassword(formData.email, formData.password);
    }
    else{
      let loginMethod;
      //to login using google account
      if(loginType == "GOOGLE")
      {
        loginMethod = new firebase.auth.GoogleAuthProvider();
      }
      //using built in firebase methods
      return this.fAuth.auth.signInWithRedirect(loginMethod);
    }
  }

  //method to log user out
  logout()
  {
    //uses built in firebase methods
    return this.fAuth.auth.signOut();
  }

  //Redirects user
  redirectLogin()
  {
    return this.fAuth.auth.getRedirectResult();
  }

  // method to return single doc
  getDoc(collUrl: string)
  {
    //stores doc in variable
    this.itemDoc = this.afs.doc<any>(collUrl);

    //changes variable to object
    return this.itemDoc.valueChanges();
  }

  //Check if user is logged in
  isUserLoggedIn(): Observable<boolean>
  {
    //checks the authstate of user
    return from(this.fAuth.authState)
    // pipe method to stitch together rxjs operators
    .pipe(take(1))
    .pipe(map(state => !!state))
    .pipe(tap(authenticated =>{
      //if authenticated should return true
      return authenticated;
    }));

  }

  //Check if user is admin
  isAdmin()
  {
    //check sif user is logged in first
    let collUrl = !this.isUserLoggedIn() ? "Not Logged in": this.fAuth.auth.currentUser.uid;
    collUrl = "fyp/ecommerce/admins/" + collUrl;
    // returns the doc of the user which should have admin variable to be checked in admin guard service
    return this.getDoc(collUrl);
  }

  // Returns all products in a collection
  getProducts(coll: string, filters?: any)
  {
    // reutrns items as a collection
    this.itemCollection = this.afs.collection<any>(this.getCollectionUrl(coll));

    // converts items to objects
    return this.itemCollection.valueChanges();
  }

  // method to create new item on database
  setProducts(coll: string, data: any, docId?: any)
  {
    //firebase creates a unique id
    const id = this.afs.createId();
    const item = {id, name};

    // time stamp to identify when item was created
    const timeStamp = this.timeStamp;

    // docref is the name of the doc where the infor will be stored
    var docRef = this.afs.collection(this.getCollectionUrl(coll)).doc(item.id);

    // sets variables with the doc
    return docRef.set(({
      ...data,
      _id: id,
      updatedAt: timeStamp,
      createdAt: timeStamp,
      delete_flag: "N"
    }));

  }

  // method to get the current date
  get timeStamp()
  {
    var d = new Date();
    return d;
  }

  // method to make using database easier, allows for less hard coding
  getCollectionUrl(filter)
  {
    return "fyp/ecommerce/" + filter;
  }

  // returns single doc
  getProductDoc(collType, id){
    // stores doc at collection url + the passed id
    let docUrl = this.getCollectionUrl(collType)+"/"+id;
    this.itemDoc = this.afs.doc<any>(docUrl);

    // converts doc to object
    return this.itemDoc.valueChanges();
  }

  //method to update speciified product
  updateProducts(coll: string, data: any, docId?: any)
  {
    //firebase creates a unique id
    const id = this.afs.createId();
    const item = {id, name};

    // time stamp for when product was updated
    const timeStamp = this.timeStamp;

    // reference for the location of the specified producted in the databse
    var docRef = this.afs.collection(this.getCollectionUrl(coll)).doc(data._id);

    // calls update method on specifiied document
    return docRef.update(({
      ...data,
      _id: id,
      updatedAt: timeStamp
    }));
  }

  // deletes specified doc
  deleteProductDoc(coll: string, docId: string){
   
    //loggin som info to console to ascertain correct info is being passed
    console.log("ID: " + docId);
    console.log("COLL: " + coll);

    // calling built in firebase delete method on specified doc within database
    return this.afs.collection(this.getCollectionUrl(coll)).doc(docId).delete();
  }

  // adds a picture to a product
  setProductPic(filePath, coll, docId?)
  {
    //loggin info to the console to make sure information is correct
    console.log(filePath)
    console.log(this.getCollectionUrl(coll))
    console.log(docId)

    var docRef = this.afs.collection(this.getCollectionUrl(coll)).doc(docId);

    // passes a path variable to the specified document that has the location of the image
    return docRef.set({
      path:filePath
    }, {merge:true});
  }

  //deletes image from specified product
  deleteProductPic(coll, docId?)
  {
    // gets collection url of doc with image to be removed
    var docRef = this.afs.collection(this.getCollectionUrl(coll)).doc(docId);
    return docRef.set({
      //reverts the path variable to null, so picture can no longer be seen
      path:null
    }, {merge:true});
  }

  //create user with email and password
  createUser(data){

    //Check if database is set to firebase, it is, not sure why this is needed but doesnt work without
    if (environment.database == 'firebase') {
    
      // uses built in firebase method to create a new user with email and password, this is needed tbefore login with email
      // and password works
      return this.fAuth.auth.createUserWithEmailAndPassword(data.value.email, data.value.password);
    }
  }

  // check if user is signed in using bult in method
  checkIfUserSignedIn() {
    return this.fAuth.authState;
  }

  // Filter through products
  getFilterProducts(coll: string, filters) {
    // returns collection and limits results using .where method and then converting to object
    return this.afs.collection(this.getCollectionUrl(coll), ref =>
    ref.where('delete_flag', '==', 'N')
        .where('tags' , 'array-contains', filters)
        .orderBy('tags', 'desc')
  ).valueChanges();
  }

  //method to add items to shopping cart
  updateShoppingCart(coll: string, data){
    // create a unique id with firebase
    const id = this.afs.createId();
    const item = { id, name };

    //timestamp for when product was added to cart
    const timestamp = this.timeStamp
    var docRef = this.afs.collection(this.getCollectionUrl(coll)).doc(item.id);
    return docRef.set({
        ...data,
        //this is needed for reference for deleteing product from cart
        _id2: id,
        //this is used for being able to know which items in cart colleciton belong to which user
        author: this.fAuth.auth.currentUser.uid,
        authorEmail: this.fAuth.auth.currentUser.email,
        updatedAt: timestamp,
        createdAt: timestamp,
        delete_flag: "N",
    });
  }

  //returns the cart for a user
  getCart(coll: string) {

    //only returns the items added to the cart by the current user
    this.itemCollection = this.afs.collection<any>(this.getCollectionUrl(coll), ref =>
    ref.where('author', '==', this.fAuth.auth.currentUser.uid)
    );
    return this.itemCollection.valueChanges();
    
}

// adds user details to user collection
  setProfile(coll: string, data: any)
  {
    // create a unique id using firebase 
    const id = this.afs.createId();
    const item = {id, name};

    //timestamp for when user doc was created
    const timestamp = this.timeStamp
    var docRef = this.afs.collection(this.getCollectionUrl(coll)).doc(item.id);
    return docRef.set({
      ...data,
      _id2: id,

      //passing the unique id of the user to the doc
      author: this.fAuth.auth.currentUser.uid,
      authorEmail: this.fAuth.auth.currentUser.email,
      updatedAt: timestamp,
      createdAt: timestamp,
      delete_flag: "N",
  });
  }

}
