import { Component, OnInit, Input } from '@angular/core';
import { BackendService} from './../../services/backend.service'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Input() pageTitle: string;
  @Input() iconTitle: string;

  counter = 0;
  UserStatusColour = "warn";
  constructor(private backendservice: BackendService) { }

  ngOnInit(): void {
    this.counter = 0;
    this.counter = this.backendservice.getCartTotal().subscribe(
      (res) => {
        this.counter = res;
      }
    );
    
    this.backendservice.isUserLoggedIn().subscribe(
      (res) => {
        this.UserStatusColour = res ? "success" : "war";
      }
    );
  }

}
