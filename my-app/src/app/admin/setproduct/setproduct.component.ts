import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-setproduct',
  templateUrl: './setproduct.component.html',
  styleUrls: ['./setproduct.component.css']
})
export class SetproductComponent implements OnInit {

  togglefield: String; 
  constructor() { }

  ngOnInit(): void {
    this.togglefield = "searchMode";
  }

  toggle(filter?) {
    if(!filter) {filter = "searchMode"}
    else {filter = filter;}
    this.togglefield = filter;
  }

}
