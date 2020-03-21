import { Component, OnInit, OnDestroy } from '@angular/core';
import { BackendService } from '../../Services/backend.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit, OnDestroy {

  toggle : boolean = true;
  savedChanges = false;
  error: boolean = false;
  errorMessage: String = "";
  dataLoading: boolean = false;
  private querySubscription;
  counter = 0;
  profileUrl: string;
  myDocData;
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

  showDetails(item) {
    this.counter = 0;
    this.myDocData = item;
    this.getPic(item.path);
    this.dataLoading = true;
    let data = item;

    this.querySubscription = this.backend_Service.updateShopping('iterests', data)
    .subscribe(members => {
      this.dataLoading = false;
      this.counter = 0;
      this.savedChanges = false;
    },
    (error) => {
      this.error  =true;
      this.errorMessage = error.message;
      this.dataLoading = false;
    },
    () =>{this.error =false; this.dataLoading = false;}
    );
}

countProducts(filter) {
  if (filter == "add") {
      this.counter = this.counter + 1;
  } else {
      if (this.counter > 0) {
          this.counter = this.counter - 1;
      }
  }
}

addToCart(item, counter){
  this.dataLoading = true;
  let data = item;
  data.qty = counter;
  

  this.querySubscription = this.backend_Service.updateShoppingCart('cart', data)
    .subscribe(members => {
      this.dataLoading = false;
      this.counter = 0;
      this.savedChanges = false;
    },
    (error) => {
      this.error  =true;
      this.errorMessage = error.message;
      this.dataLoading = false;
    },
    () =>{this.error =false; this.dataLoading = false;}
    );
}

ngOnDestroy() {
  if (this.querySubscription) {
      this.querySubscription.unsubscribe();
  }
}

}
