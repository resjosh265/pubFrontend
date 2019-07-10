import { Component, OnInit } from '@angular/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { Carousel } from 'src/app/classes/carousel';
import { GeneralService } from 'src/app/_Services/general.service';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css'],
  providers: [NgbCarouselConfig]
})
export class CarouselComponent implements OnInit{

  carouselData: Carousel[];

  constructor(config: NgbCarouselConfig, private generalService:GeneralService) {
    // customize default values of carousels used by this component tree
    config.interval = 10000;
    config.wrap = true;
    config.keyboard = false;
    config.pauseOnHover = true;
  }

  ngOnInit(){
    this.getCarouselData();
  }

  getCarouselData(){
    this.generalService.getCarouselData().subscribe(data => {
        this.carouselData = data;
      }
    )
  }

}
