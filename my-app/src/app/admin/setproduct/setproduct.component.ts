import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-setproduct',
  templateUrl: './setproduct.component.html',
  styleUrls: ['./setproduct.component.css']
})
export class SetproductComponent implements OnInit {

  toggleField: String; 
  savedChanges = false;
  

  constructor() { }

  ngOnInit(): void {
    this.toggleField = "searchMode";
  }

  toggle(filter?) {
    if(!filter) {filter = "searchMode"}
    else {filter = filter;}
    this.toggleField = filter;
  }

  getData()
  {

  }

  updateDate()
  {

  }

  
}
