import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MatSliderChange } from '@angular/material/slider';

@Component({
  selector: 'app-add-abilities',
  templateUrl: './add-abilities.component.html',
  styleUrls: ['./add-abilities.component.css']
})
export class AddAbilitiesComponent implements OnInit {

  @Output() detailCapacite = new EventEmitter<any>();

  readonly MIN_PUISSANCE = 50;
  readonly MAX_PUISSANCE = 149;
  readonly MIN_PRECISION = 1;
  readonly MAX_PRECISION = 100;

  puissance = 100;
  precision = 50;
  selectedNom = '';
  selectedType = '';

  constructor() {
  }

  ngOnInit(): void {
  }

  onPuissanceChange(event: MatSliderChange) {
    this.precision = 150 - this.puissance;

    this.detailCapacite.emit({
      nom: this.selectedNom,
      type: this.selectedType,
      puissance: this.puissance,
      precision: this.precision
    });
  }

  onPrecisionChange(event: MatSliderChange) {
    this.puissance = 150 - this.precision;

    this.detailCapacite.emit({
      nom: this.selectedNom,
      type: this.selectedType,
      puissance: this.puissance,
      precision: this.precision
    });
  }

  onFieldChange() {
    this.detailCapacite.emit({
      nom: this.selectedNom,
      type: this.selectedType,
      puissance: this.puissance,
      precision: this.precision
    });
  }
}