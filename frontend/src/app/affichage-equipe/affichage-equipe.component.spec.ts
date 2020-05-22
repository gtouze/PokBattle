import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AffichageEquipeComponent } from './affichage-equipe.component';

describe('AffichageEquipeComponent', () => {
  let component: AffichageEquipeComponent;
  let fixture: ComponentFixture<AffichageEquipeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AffichageEquipeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AffichageEquipeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
