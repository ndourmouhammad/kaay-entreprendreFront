import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificationEvenementComponent } from './modification-evenement.component';

describe('ModificationEvenementComponent', () => {
  let component: ModificationEvenementComponent;
  let fixture: ComponentFixture<ModificationEvenementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModificationEvenementComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModificationEvenementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
