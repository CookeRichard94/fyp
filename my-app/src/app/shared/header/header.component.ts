import { Component, OnInit, Input } from '@angular/core';
import { BackendService} from './../../services/backend.service'
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  // Input variables, change depending on page
  @Input() pageTitle: string;
  @Input() iconTitle: string;

  // Counter for items in cart
  counter = 0;
  count = 0;

  //colour for user logged in status
  UserStatusColour = "warn";
  constructor(private backend_Service: BackendService) { }

  ngOnInit(): void {
    // check if user is logged in straight away
    this.backend_Service.isUserLoggedIn().subscribe(
      (res) => {
        //if logged in icon is green if not icon is red
        this.UserStatusColour = res ? "success" : "war";
      }
    );

    //gets cart total
    this.getCartTotal(); 
  }

  //gets the total number of items in cart
  getCartTotal(){
    this.counter = 0;

    //calls the get cart to return all items in cart belonging to user
    this.backend_Service.getCart('cart').subscribe((res) => {

      //passes the length of result to counter
      this.counter = res.length;
      
      //passes ounter page to badge
      return this.counter;
    });
  }

}
