import { Component, OnInit } from '@angular/core';
import { BackendService } from '../../Services/backend.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private backend_Service: BackendService, private router: Router) { }

  state: string = '';
  error: any;
  dataLoading: boolean = false;
  brokenNetwork = false;
  savedChanges = false;

  ngOnInit(): void {
  }

  routeLoginPage (){
    this.router.navigate(['/login']);
  }

  onSubmit(formData) {
    this.dataLoading = true;
    this.backend_Service.createUser(formData).then(
      (success) =>
      {
        this.dataLoading = false;
        this.savedChanges = true;
      },
        (error) => {
          this.error = error;
          this.dataLoading = false;
          this.savedChanges = false;
        }
      )
  }

}
