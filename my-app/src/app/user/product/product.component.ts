import { Component, OnInit, OnDestroy } from '@angular/core';
import { BackendService } from '../../Services/backend.service';
import { Observable, of } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/storage';

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
  profileUrl: Observable<string | null>;
  myDocData;
  members: Observable<any>;

  constructor(private backend_Service: BackendService, private storage: AngularFireStorage) { }

  ngOnInit(): void {
    this.getData();
    
  }

  getData()
  {
    this.members = this.backend_Service.getProducts('product');
  }

  getFilterData(filters)
  {
    if (filters) {
      this.members = this.backend_Service.getFilterProducts('product', filters);
  } else {
      this.getData();
  }
  }

  getPic(picId) {
    const ref = this.storage.ref(picId);
    this.profileUrl = ref.getDownloadURL();
}

  showDetails(item) {
    this.counter = 0;
    this.myDocData = item;
    this.getPic(item.path);
    this.dataLoading = true;
    let data = item;

   
    
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
  return this.backend_Service.updateShoppingCart('cart',data).then((success)=> {
      this.dataLoading = false;
      this.counter=0;
      this.savedChanges=true;
  });
}

ngOnDestroy() {
  if (this.querySubscription) {
      this.querySubscription.unsubscribe();
  }
}

}
