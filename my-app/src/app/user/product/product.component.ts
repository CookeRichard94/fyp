import { Component, OnInit } from '@angular/core';
import { BackendService } from '../../Services/backend.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  toggle : boolean = true;
  savedChanges = false;
  error: boolean = false;
  errorMessage: String = "";
  dataLoading: boolean = false;
  private querySubscription;
  counter = 0;
  profileUrl: Observable<string | null>;
  members: Observable<any>;

  constructor(private backend_Service: BackendService) { }

  ngOnInit(): void {
    this.getData();
  }

  getData()
  {
    this.dataLoading = true;
      this.querySubscription = this.backend_Service.getProducts('product')
        .subscribe(members => {
          this.members = members;
          this.dataLoading = false;
        },
        (error) => {
          this.error  =true;
          this.errorMessage = error.message;
          this.dataLoading = false;
        },
        () =>{this.error =false; this.dataLoading = false;}
        );
  }

  getFilterData(filters)
  {
    this.dataLoading = true;
      this.querySubscription = this.backend_Service.getFilterProducts('product', filters)
        .subscribe(members => {
          this.members = members;
          this.dataLoading = false;
        },
        (error) => {
          this.error  =true;
          this.errorMessage = error.message;
          this.dataLoading = false;
        },
        () =>{this.error =false; this.dataLoading = false;}
        );
  }

  getPic(picID){
    this.profileUrl = "";
  }

}
