import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { BackendService} from '../../Services/backend.service';
import { Observable } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/storage';



@Component({
  selector: 'app-setproduct',
  templateUrl: './setproduct.component.html',
  styleUrls: ['./setproduct.component.css']
})
export class SetproductComponent implements OnInit, OnDestroy {

  // Variables
  toggleField: String; 
  savedChanges = false;
  error: boolean = false;
  errorMessage: String = "";
  dataLoading: boolean = false;
  private querySubscription;
  dataSource: MatTableDataSource<any>;
  members: any[];
  myDocId;
  myDocData;
  takeHostSelfie = false;
  showHostSelfie = false;
  profileUrl: Observable<string | null>;
  
  // Columns to outline the tables heads in the mat table
  displayedColumns = ['category', 'name', 'price', '_id'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  //Import angular storage and the backend service
  constructor(private backend_Service: BackendService, private storage: AngularFireStorage) { }

  ngOnInit(): void {
    // Initially set to searchmode
    this.toggleField = "searchMode";
    this.dataSource = new MatTableDataSource(this.members);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  // Toggle method to allow for different templates to be activated
  toggle(filter?) {
    if(!filter) {filter = "searchMode"}
    else {filter = filter;}
    this.toggleField = filter;
  }

  //Retrieves product data from the database
  getData()
  {
    this.dataLoading = true;
    //Uses getproducts method and passes parameter "product"
    this.querySubscription = this.backend_Service.getProducts('product')
        .subscribe(members => {
            this.members = members;
            this.dataSource = new MatTableDataSource(members);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
        });
  }

  // Creates a new product and passes the data in the creation form to the database
  setData(formData)
  {
    this.dataLoading = true;
    // Passes the "product" to sigal which collection to send to and the from data to fille out the document
      this.querySubscription = this.backend_Service.setProducts('product',formData)
        .then((res) => {
          this.savedChanges =true;
          this.dataLoading = true;
        })
        .catch(error => {
          this.error = true;
          this.errorMessage = error.message;
          this.dataLoading = false;
        })
  }
        

  // Updates a current product
  updateData(formData)
  {
    this.dataLoading = true;
    // Works exactly like setData except passes data to an existing document
      this.querySubscription = this.backend_Service.updateProducts('product',formData)
      .then((res) => {
        this.savedChanges =true;
        this.dataLoading = true;
      })
      .catch(error => {
        this.error = true;
        this.errorMessage = error.message;
        this.dataLoading = false;
      })

  }

  //data table results
  // Filters through product data
  applyFilter(filterValue: String){
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if(this.dataSource.paginator){
      this.dataSource.paginator.firstPage();
    }
  }

  // Allows for search of specific product
  getFilterData(filters)
  {
    this.dataLoading = true;
    // Search product collection using getfilterproduct method and passes entered filters to narrow results
      this.querySubscription = this.backend_Service.getFilterProducts('product', filters)
        .subscribe(members => {
          this.members = members;
          this.dataSource = new MatTableDataSource(members);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        },
        (error) => {
          this.error  =true;
          this.errorMessage = error.message;
          this.dataLoading = false;
        },
        () =>{this.error =false; this.dataLoading = false;}
        );
  }

  // Returns a single document instead of all, uses the docId to identify the product, used for editing existing product
  getDoc(docId)
  {

    this.dataLoading = true;
    // search product collection by the id of the document you want
      this.querySubscription = this.backend_Service.getProductDoc('product', docId)
        .subscribe(res => {
         if(res)
         {
           // Change to edit mode if it exists on collection
          this.myDocData = res;
          this.toggle('editMode');
         }
        },
        (error) => {
          this.error  =true;
          this.errorMessage = error.message;
          this.dataLoading = false;
        },
        () =>{this.error =false; this.dataLoading = false;}
        );
  }

  // Method to delete a product
  deleteDoc(docId)
  {
    //Uses a confirm to ascertain if the admin wants to remove product
    if (confirm("Are you sure want to delete this product ?")) {
      this.dataLoading = true;
      //Passes the id of the document to specify particular document
      this.backend_Service.deleteProductDoc('product', docId).then((res) => {
        //switches to search mode
          this.toggle('searchMode');
      });
  }
  }

  // retrives picture from collection and passes its path to variable
  getPic(picId) {
    const ref = this.storage.ref(picId);
    this.profileUrl = ref.getDownloadURL();
  }
  
  // Deletes specified picture, contains a confirm to ascertain the decision should take place
  deleteProductPic(docId){
    if (confirm("Are you sure want to delete this picture ?")) {
    this.backend_Service.deleteProductPic('product',docId);
    }
  }

  ngOnDestroy()
  {
    if (this.querySubscription) {
      this.querySubscription.unsubscribe();
    }
  }

  
}
