import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RessourceDetailComponent } from './ressource-detail.component';

describe('RessourceDetailComponent', () => {
  let component: RessourceDetailComponent;
  let fixture: ComponentFixture<RessourceDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RessourceDetailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RessourceDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
