import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  errorMessage: string = "";
  constructor() { }

  ngOnInit(): void {
    this.getUser();
  }

  onSubmit(formData){

  }

  logout(){

  }

  getUser(){

  }

}
