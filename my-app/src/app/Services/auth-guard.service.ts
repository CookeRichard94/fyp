import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import {AngularFireAuth} from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import { Observable, from } from "rxjs";
import { take } from 'rxjs/operators';
import { map } from 'rxjs/operators';
import { tap } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate{

  constructor(public fAuth: AngularFireAuth,  private router: Router) { }

  // auth service to check if user is logged in, if not they canot acces pages with this attachment
  canActivate(): Observable<boolean>
  {
    //checks authstate
    return from(this.fAuth.authState)
    //pip method to stitch together rxjs operators
    .pipe(take(1))
    .pipe(map(state => !!state))
    .pipe(tap(authenticated => 
      {
        //if not logged in revert to login page
        if(!authenticated)
        {
          console.log("fail")
          this.router.navigate(['/login']);
        }
      }))
  }
}
