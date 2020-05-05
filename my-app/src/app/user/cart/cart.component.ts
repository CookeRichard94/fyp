import { Component, OnInit, OnDestroy } from '@angular/core';
import { BackendService } from '../../Services/backend.service';
import { Observable, of } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/storage';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit, OnDestroy {

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
  total = 0;

  constructor(private backend_Service: BackendService, private storage: AngularFireStorage, private router: Router) { }

  ngOnInit(): void {
    //gets items in cart
    this.getData();

    //calculates cart price total
    this.getCartTotal();
  }

  //Calls all items in the cart collection
  getData()
  {
    this.members = this.backend_Service.getCart('cart');
  }

  //Shows an indivdiual item and its data
  showDetails(item) {
    this.counter = 0;
    this.myDocData = item;
    //Callin getpic method on the path variable of the doc
    this.getPic(item.path);
    this.dataLoading = true;
  }

  // Returns the picture associated with the product by passing the path of the picture in the document
  getPic(picId) {
    const ref = this.storage.ref(picId);
    this.profileUrl = ref.getDownloadURL();
  }

  //Removes an item from cart using the id of product
  removeFromCart(id)
  {
    //A confirm to ascertai the delete should take place
    if (confirm("Are you sure want to remove this product?")){
      this.backend_Service.deleteProductDoc('cart', id);
    }
  }

  //Returns the total price of the cart
  getCartTotal()
  {
    //Gets all items in the users cart
    this.backend_Service.getCart('cart').subscribe((res) => {
      this.total = 0;
      //For loop to loop through the results 
      for(let i = 0; i < res.length; i++) {
        //Add the price of each result onto the total price
        this.total = this.total + res[i]['price'];
      }
      //return the total price
      return this.total;
    });
  }

ngOnDestroy() {
  if (this.querySubscription) {
      this.querySubscription.unsubscribe();
  }
}

}
