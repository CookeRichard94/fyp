import { Component, OnInit } from '@angular/core';
import { BackendService } from 'src/app/Services/backend.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  userLoggedIn: boolean = true;
  error: boolean = false;
  errorMessage: string = "";
  dataLoading: boolean = false;
  savedChanges = false;

  constructor(private backend_service: BackendService, public fAuth: AngularFireAuth, private router: Router) { }

  ngOnInit(): void {
    this.getUser();
  }

  onSubmit(formData){

  }

  logout(){
    this.dataLoading = true;
    return this.backend_service.logout().then((success)=>
    {
      this.userLoggedIn=false;
      this.dataLoading=false;
      this.router.navigate(['/login']);
    });


  }

  getUser(){

  }

  routeLoginPage()
  {
    this.router.navigate(['/login']);
  }

}
