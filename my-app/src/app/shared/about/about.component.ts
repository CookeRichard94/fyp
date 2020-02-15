import { Component, OnInit } from '@angular/core';
import { moveIn, fallIn} from '../router.animation';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
  
})
export class AboutComponent implements OnInit {

  state: string = '';
  constructor() { }

  ngOnInit(): void {
  }

}
