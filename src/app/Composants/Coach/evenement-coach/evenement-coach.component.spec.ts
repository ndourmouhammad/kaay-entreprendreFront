import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvenementCoachComponent } from './evenement-coach.component';

describe('EvenementCoachComponent', () => {
  let component: EvenementCoachComponent;
  let fixture: ComponentFixture<EvenementCoachComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EvenementCoachComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EvenementCoachComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
