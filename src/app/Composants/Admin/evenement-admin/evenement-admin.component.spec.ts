import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvenementAdminComponent } from './evenement-admin.component';

describe('EvenementAdminComponent', () => {
  let component: EvenementAdminComponent;
  let fixture: ComponentFixture<EvenementAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EvenementAdminComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EvenementAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
