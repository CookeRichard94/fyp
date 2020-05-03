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
  
  displayedColumns = ['category', 'name', 'price', '_id'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private backend_Service: BackendService, private storage: AngularFireStorage) { }

  ngOnInit(): void {
    this.toggleField = "searchMode";
    this.dataSource = new MatTableDataSource(this.members);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  toggle(filter?) {
    if(!filter) {filter = "searchMode"}
    else {filter = filter;}
    this.toggleField = filter;
  }

  getData()
  {
    this.dataLoading = true;
    this.querySubscription = this.backend_Service.getProducts('product')
        .subscribe(members => {
            this.members = members;
            this.dataSource = new MatTableDataSource(members);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
        });
  }

  setData(formData)
  {
    this.dataLoading = true;
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
        

  updateData(formData)
  {
    this.dataLoading = true;
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
  applyFilter(filterValue: String){
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if(this.dataSource.paginator){
      this.dataSource.paginator.firstPage();
    }
  }

  getFilterData(filters)
  {
    this.dataLoading = true;
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

  getDoc(docId)
  {
    this.dataLoading = true;
      this.querySubscription = this.backend_Service.getProductDoc('product', docId)
        .subscribe(res => {
         if(res)
         {
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

  deleteDoc(docId)
  {
    if (confirm("Are you sure want to delete this product ?")) {
      this.dataLoading = true;
      this.backend_Service.deleteProductDoc('product', docId).then((res) => {
          this.toggle('searchMode');
      });
  }
  }

  getPic(picId) {
    const ref = this.storage.ref(picId);
    this.profileUrl = ref.getDownloadURL();
  }
  
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
