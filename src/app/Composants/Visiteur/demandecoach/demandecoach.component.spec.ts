import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemandecoachComponent } from './demandecoach.component';

describe('DemandecoachComponent', () => {
  let component: DemandecoachComponent;
  let fixture: ComponentFixture<DemandecoachComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DemandecoachComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DemandecoachComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
