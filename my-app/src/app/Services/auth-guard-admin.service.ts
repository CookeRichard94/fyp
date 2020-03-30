import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable, from } from "rxjs";
import {BackendService} from './backend.service';
import { take } from 'rxjs/operators';
import { map } from 'rxjs/operators';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardAdminService implements CanActivate{

  constructor(private backend_service: BackendService) { }

  canActivate(): Observable<boolean>
  {
    return this.backend_service.isAdmin()
    .pipe(take(1))
    .pipe(map(res =>{
      if(res)
      {
        return true;
      }
      else{
        return false;
      }
    }))
    .pipe(tap(isadmin => {
      console.log(isadmin)
      return true;
    }))
  }
}
