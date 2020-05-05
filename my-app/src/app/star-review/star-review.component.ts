import { Component, OnInit, Input } from '@angular/core';
import { StarService } from '../Services/star.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'star-review',
  templateUrl: './star-review.component.html',
  styleUrls: ['./star-review.component.scss']
})
export class StarReviewComponent implements OnInit {


  @Input() userId;
  @Input() productId;

  stars: Observable<any>;
  avgRating: Observable<any>;

  constructor(private starService: StarService) { }

  ngOnInit() {
    this.stars = this.starService.getMovieStars(this.productId)

    //Averages the ratings applied to the product
    this.avgRating = this.stars.pipe(map(arr => {
      const ratings = arr.map(v => v.value)
      //Output value or if no reviews yet output no reviews message
      return ratings.length ? ratings.reduce((total, val) => total + val) / arr.length : 'not reviewed'
    })
    )}

    //Send star ratings to collection in database along witht he product id and the user id
    starHandler(value) {
      this.starService.setStar(this.userId, this.productId, value)
    }


}