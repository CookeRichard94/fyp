import { Component, OnInit } from '@angular/core';
import { BackendService} from './../../Services/backend.service';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  //Variables
  userLoggedIn: boolean = true;
  error: boolean = false;
  errorMessage: string = "";
  dataLoading: boolean = false;

  constructor(private backend_service: BackendService, public fAuth: AngularFireAuth) { }

  ngOnInit(): void {
    //Check if user is signed in
    this.getAuthStatus();
  }

  //Login method, form data is an optioal input as google login does not require it
  login(loginType, formData?)
  {
    this.dataLoading=true;

    //Returns a login
    return this.backend_service.login(loginType, formData);
  }

  //Logs user out
  logout()
  {
    this.dataLoading = true;
    //Uses firebase built in method to log user out
    return this.backend_service.logout().then((success)=>
    {
      this.userLoggedIn=false;
      this.dataLoading=false;
    });
  }

  //Checks the authentication status of the user
  getAuthStatus()
  {
    this.dataLoading = true;
    this.backend_service.redirectLogin().then(function(result)
    {
      if(result.credential)
      {
        //If the access token isnt empty the user is not logged in
        console.log(result.credential)
        if(result.credential["accessToken"] != "")
        {
          return this.userLoggedIn = false
        }
        this.dataLoading=false;
      }
    }).catch(
      (err) => {
        this.error = true;
        this.errorMessage = err.message;
        console.log(err);
        this.userLoggedIn=false;
        this.dataLoading=false; 
      }
    )
  }

}
