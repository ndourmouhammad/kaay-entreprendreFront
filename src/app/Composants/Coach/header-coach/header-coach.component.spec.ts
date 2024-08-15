import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderCoachComponent } from './header-coach.component';

describe('HeaderCoachComponent', () => {
  let component: HeaderCoachComponent;
  let fixture: ComponentFixture<HeaderCoachComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderCoachComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HeaderCoachComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
