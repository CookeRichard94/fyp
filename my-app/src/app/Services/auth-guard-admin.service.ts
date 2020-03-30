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
    .take(1)
    .map(res =>{
      if(res)
      {
        return res.isadmin;
      }
      else{
        return false;
      }
    })
    .do(isadmin => {
      console.log(isadmin)
      return true;
    })
  }
}
