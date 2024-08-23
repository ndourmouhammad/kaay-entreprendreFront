import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailEvenementCoachComponent } from './detail-evenement-coach.component';

describe('DetailEvenementCoachComponent', () => {
  let component: DetailEvenementCoachComponent;
  let fixture: ComponentFixture<DetailEvenementCoachComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailEvenementCoachComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetailEvenementCoachComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
