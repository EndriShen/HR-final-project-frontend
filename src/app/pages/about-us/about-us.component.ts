import { Component } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.scss']
})
export class AboutUsComponent {

  constructor(private location: Location) {}

  goBack(): void {
    this.location.back();
  }
  
}
