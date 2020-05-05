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

  //Variables
  userLoggedIn: boolean = true;
  error: boolean = false;
  errorMessage: string = "";
  dataLoading: boolean = false;
  savedChanges = false;
  private querySubscription;
  

  constructor(private backend_service: BackendService, public fAuth: AngularFireAuth, private router: Router) { }

  ngOnInit(): void {
    //Get user data
    this.getUser();
  }

  // Submit the form data as a parameter to the setprofile method to add to user collection
  onSubmit(formData){
    this.dataLoading = true;
      this.querySubscription = this.backend_service.setProfile('users',formData)
        .then((res) => {
          this.savedChanges =true;
          this.dataLoading = true;
        })
        .catch(error => {
          this.error = true;
          this.errorMessage = error.message;
          this.dataLoading = false;
        })
  }

  // Logs user out 
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

  //Routes to login page using router
  routeLoginPage()
  {
    this.router.navigate(['/login']);
  }

}
