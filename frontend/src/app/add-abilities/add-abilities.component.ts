import { Component, OnInit, Input } from '@angular/core';
import { MatSliderChange } from '@angular/material/slider';

@Component({
  selector: 'app-add-abilities',
  templateUrl: './add-abilities.component.html',
  styleUrls: ['./add-abilities.component.css']
})
export class AddAbilitiesComponent implements OnInit {

  readonly MIN_PUISSANCE = 50;
  readonly MAX_PUISSANCE = 149;
  readonly MIN_PRECISION = 1;
  readonly MAX_PRECISION = 100;

  puissance = 100;
  precision = 50;

  constructor() {
  }

  ngOnInit(): void {
  }

  onPuissanceChange(event: MatSliderChange) {
    this.precision = 150 - this.puissance;

  }

  onPrecisionChange(event: MatSliderChange) {
    this.puissance = 150 - this.precision;
  }

}
