import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAbilitiesComponent } from './add-abilities.component';

describe('AddAbilitiesComponent', () => {
  let component: AddAbilitiesComponent;
  let fixture: ComponentFixture<AddAbilitiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddAbilitiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAbilitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
