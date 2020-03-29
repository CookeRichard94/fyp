import { Component, OnInit } from '@angular/core';
import { BackendService} from './../../Services/backend.service';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userLoggedIn: boolean = true;
  error: boolean = false;
  errorMessage: string = "";
  dataLoading: boolean = false;

  constructor(private backend_service: BackendService, public fAuth: AngularFireAuth) { }

  ngOnInit(): void {
    this.getAuthStatus();
  }

  login(loginType, formData?)
  {
    this.dataLoading=true;
    return this.backend_service.login(loginType, formData);
  }

  logout()
  {
    this.dataLoading = true;
    return this.backend_service.logout().then((success)=>
    {
      this.userLoggedIn=false;
      this.dataLoading=false;
    });
  }

  getAuthStatus()
  {
    this.dataLoading = true;
    this.backend_service.redirectLogin().then(function(result)
    {
      if(result.credential)
      {
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
