import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RetourExperienceComponent } from './retour-experience.component';

describe('RetourExperienceComponent', () => {
  let component: RetourExperienceComponent;
  let fixture: ComponentFixture<RetourExperienceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RetourExperienceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RetourExperienceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
