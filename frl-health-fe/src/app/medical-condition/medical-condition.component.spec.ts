import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicalConditionComponent } from './medical-condition.component';

describe('MedicalConditionComponent', () => {
  let component: MedicalConditionComponent;
  let fixture: ComponentFixture<MedicalConditionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MedicalConditionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicalConditionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
