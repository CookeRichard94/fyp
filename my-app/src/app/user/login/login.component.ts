import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userLoggedIn: boolean = true;

  constructor() { }

  ngOnInit(): void {
    this.userLoggedIn = false;
  }

  login(email, formData)
  {

  }

}
