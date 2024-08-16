import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RessoutceComponent } from './ressoutce.component';

describe('RessoutceComponent', () => {
  let component: RessoutceComponent;
  let fixture: ComponentFixture<RessoutceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RessoutceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RessoutceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
