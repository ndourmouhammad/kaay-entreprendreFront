import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvenementsDetailsAdminComponent } from './evenements-details-admin.component';

describe('EvenementsDetailsAdminComponent', () => {
  let component: EvenementsDetailsAdminComponent;
  let fixture: ComponentFixture<EvenementsDetailsAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EvenementsDetailsAdminComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EvenementsDetailsAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
