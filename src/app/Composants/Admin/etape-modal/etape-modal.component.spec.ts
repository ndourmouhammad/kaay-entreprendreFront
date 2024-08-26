import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EtapeModalComponent } from './etape-modal.component';

describe('EtapeModalComponent', () => {
  let component: EtapeModalComponent;
  let fixture: ComponentFixture<EtapeModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EtapeModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EtapeModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
