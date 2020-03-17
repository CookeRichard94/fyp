import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { BackendService} from '../../Services/backend.service';


@Component({
  selector: 'app-setproduct',
  templateUrl: './setproduct.component.html',
  styleUrls: ['./setproduct.component.css']
})
export class SetproductComponent implements OnInit {

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
  
  displayedColumns = ['category', 'scategory', 'name', 'price', '_id'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private backendService: BackendService) { }

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
      this.querySubscription = this.backendService.getProducts('product')
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

  setData(formData)
  {

  }
        

  updateData(dataForm)
  {

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

  }

  getDoc(docId)
  {

  }

  deleteDoc(docId)
  {

  }

  getPic(picId)
  {

  }

  deleteProductPic(docId)
  {

  }


  
}
