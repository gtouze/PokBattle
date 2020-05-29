import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { MatSliderChange } from '@angular/material/slider';

@Component({
  selector: 'app-add-abilities',
  templateUrl: './add-abilities.component.html',
  styleUrls: ['./add-abilities.component.css']
})
export class AddAbilitiesComponent implements OnInit {

  @Input() initialValue: any;
  @Output() detailCapacite = new EventEmitter<any>();

  readonly MIN_PUISSANCE = 50;
  readonly MAX_PUISSANCE = 149;
  readonly MIN_PRECISION = 1;
  readonly MAX_PRECISION = 100;

  puissance: number;
  precision: number;
  selectedNom: string;
  selectedType: string;

  constructor() {
  }

  ngOnInit(): void {
    this.puissance = this.initialValue.puissance;
    this.precision = this.initialValue.precision;
    this.selectedNom = this.initialValue.selectedNom;
    this.selectedType = this.initialValue.selectedType;
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