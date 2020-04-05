import { Component, OnInit, OnDestroy } from '@angular/core';
import { BackendService } from '../../Services/backend.service';
import { Observable, of } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/storage';

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

  constructor(private backend_Service: BackendService, private storage: AngularFireStorage) { }

  ngOnInit(): void {
    this.getData();
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

ngOnDestroy() {
  if (this.querySubscription) {
      this.querySubscription.unsubscribe();
  }
}

}
