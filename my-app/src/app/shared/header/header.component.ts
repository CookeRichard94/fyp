import { Component, OnInit, Input } from '@angular/core';
import { BackendService} from './../../services/backend.service'
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Input() pageTitle: string;
  @Input() iconTitle: string;

  counter = 0;
  count = 0;
  UserStatusColour = "warn";
  constructor(private backend_Service: BackendService) { }

  ngOnInit(): void {
    this.backend_Service.isUserLoggedIn().subscribe(
      (res) => {
        this.UserStatusColour = res ? "success" : "war";
      }
    );

    this.getCartTotal(); 
  }

  getCartTotal(){
    this.counter = 0;
    this.backend_Service.getCart('cart').subscribe((res) => {
      this.counter = res.length;
      
      return this.counter;
    });
  }

}
