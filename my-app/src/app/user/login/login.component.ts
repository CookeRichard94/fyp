import { Component, OnInit } from '@angular/core';
import { BackendService} from './../../Services/backend.service';

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

  constructor(private backend_service: BackendService) { }

  ngOnInit(): void {
    this.getAuthStatus();
  }

  login(filter, formData)
  {
    
  }

  logout()
  {

  }

  getAuthStatus()
  {

  }

}
