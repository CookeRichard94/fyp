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
    this.getData();
    this.getCartTotal();
  }

  getData()
  {
    this.members = this.backend_Service.getCart('cart');
  }

  showDetails(item) {
    this.counter = 0;
    this.myDocData = item;
    this.getPic(item.path);
    this.dataLoading = true;
  }

  getPic(picId) {
    const ref = this.storage.ref(picId);
    this.profileUrl = ref.getDownloadURL();
  }

  removeFromCart(id)
  {
    if (confirm("Are you sure want to remove this product?")){
      this.backend_Service.deleteProductDoc('cart', id);
    }
  }

  getCartTotal()
  {
    this.backend_Service.getCart('cart').subscribe((res) => {
      this.total = 0;
      for(let i = 0; i < res.length; i++) {
        this.total = this.total + res[i]['price'];
      }
      return this.total;
    });
  }

ngOnDestroy() {
  if (this.querySubscription) {
      this.querySubscription.unsubscribe();
  }
}

}
