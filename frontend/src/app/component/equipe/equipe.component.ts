import { Component, OnInit, Input, EventEmitter, Output, Inject } from '@angular/core';
import { TokenStorageService } from 'src/app/_services/token-storage.service';
import { Capacite } from 'src/app/models/capacite.model';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { CapaciteService } from 'src/app/_webservices/capacite.webservice';

@Component({
  selector: 'app-equipe',
  templateUrl: './equipe.component.html',
  styleUrls: ['./equipe.component.css']
})
export class EquipeComponent implements OnInit {

  @Input() equipe: string;

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  clickCapa1(capacite1: Capacite) {
    const dialogRef = this.dialog.open(PopupModifierCapacite, {
      width: '400px',
      data: capacite1
    });

    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    });
  }

  clickCapa2(capacite2: Capacite) {
    const dialogRef = this.dialog.open(PopupModifierCapacite, {
      width: '400px',
      data: capacite2
    });

    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    });
  }

}

@Component({
  selector: 'popup-modifier-capacite',
  templateUrl: 'popup-modifier-capacite.html',
})
export class PopupModifierCapacite {

  abilityInitValue = {
    puissance: this.data.puissance,
    precision: this.data.precisionCapacite,
    selectedNom: this.data.nom,
    selectedType: this.data.type
  };
  capaciteNom = '';
  capaciteType = '';
  capacitePuiss = 0;
  capacitePrec = 0;

  constructor(private capaciteService: CapaciteService,
              public dialogRef: MatDialogRef<PopupModifierCapacite>,
              @Inject(MAT_DIALOG_DATA) public data: Capacite) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  onModifyClick() {
    const newValue = new Capacite(this.data.idCapacite, this.capaciteNom, this.capacitePuiss, this.capacitePrec, this.capaciteType);
    console.log(newValue);
    this.capaciteService.putCapacite(newValue).subscribe((status: any) => {
      this.dialogRef.close();
    }, (err) => {
      console.error(err);
    });
  }

  onRemoveClick() {
    this.capaciteService.deleteCapacite(this.data.idCapacite.toString()).subscribe((status: any) => {
      this.dialogRef.close();
    }, (err) => {
      console.error(err);
    });
  }

  changeCapacite(attributsCapa: any) {
    this.capaciteNom = attributsCapa.nom;
    this.capaciteType = attributsCapa.type;
    this.capacitePuiss = attributsCapa.puissance;
    this.capacitePrec = attributsCapa.precision;
  }

}
