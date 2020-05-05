import { Component, OnInit, OnDestroy } from '@angular/core';
import { BackendService } from '../../Services/backend.service';
import { Observable, of } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFireAuth} from '@angular/fire/auth';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit, OnDestroy {

  // Variables
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
  userId;
  product: Observable<any>;

  constructor(private backend_Service: BackendService, private storage: AngularFireStorage, public fAuth: AngularFireAuth) { }

  ngOnInit(): void {
    // Gets the products list
    this.getData();

    // Gets the users unique id
    this.userId = this.fAuth.auth.currentUser.uid;

    //Outputting info to console to assure the right infro is passed
    console.log(this.userId);
    console.log(this.product);
  }

  // Calls all the data in the product collection of the database
  getData()
  {
    this.members = this.backend_Service.getProducts('product');
  }

  // Filters the products dispalayed 
  getFilterData(filters)
  {
    if (filters) {
      this.members = this.backend_Service.getFilterProducts('product', filters);
  } else {
      this.getData();
  }
  }

  // Returns the picture associated with doc and passes path to variable
  getPic(picId) {
    const ref = this.storage.ref(picId);
    this.profileUrl = ref.getDownloadURL();
}

//Show the dtails of a sngle item
  showDetails(item) {
    this.counter = 0;
    this.myDocData = item;
    this.getPic(item.path);
    this.dataLoading = true;
    let data = item;
}

// Counter for quantity to be added to cart
countProducts(filter) {
  if (filter == "add") {
      this.counter = this.counter + 1;
  } else {
      if (this.counter > 0) {
          this.counter = this.counter - 1;
      }
  }
}

// Adds the items specified to the cart along with the counter which is to act as the quantity
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
