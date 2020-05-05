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

  // Auth guard service that allows only people who are part of the admins collection to use pages with this limit on
  canActivate(): Observable<boolean>
  {
    // using isadmin method from backendservice
    return this.backend_service.isAdmin()
    //Pipe method to stitch together rxjs operators
    .pipe(take(1))
    .pipe(map(res =>{
      if(res)
      {//should be true
        return res.isAdmin;
      }
      else{
        //not admin return false
        return false;
      }
    }))
    .pipe(tap(isAdmin => {
      console.log(isAdmin)
      //is admin return true
      return true;
    }))
  }
}
