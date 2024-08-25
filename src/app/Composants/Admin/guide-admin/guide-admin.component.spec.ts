import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuideAdminComponent } from './guide-admin.component';

describe('GuideAdminComponent', () => {
  let component: GuideAdminComponent;
  let fixture: ComponentFixture<GuideAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GuideAdminComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GuideAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
