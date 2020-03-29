import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import {AngularFireAuth} from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import { Observable, from } from "rxjs";
import 'rxjs/add/operator/do';
import { take } from 'rxjs/operators';
import { map } from 'rxjs/operators';
import { tap } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate{

  constructor(public fAuth: AngularFireAuth,  private router: Router) { }

  canActivate(): Observable<boolean>
  {
    return from(this.fAuth.authState)
    .pipe(take(1))
    .pipe(map(state => !!state))
    .pipe(tap(authenticated => 
      {
        if(!authenticated)
        {
          this.router.navigate(['/login']);
        }
      }))
  }
}
