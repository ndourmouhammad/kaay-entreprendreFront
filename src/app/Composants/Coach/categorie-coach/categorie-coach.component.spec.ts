import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategorieCoachComponent } from './categorie-coach.component';

describe('CategorieCoachComponent', () => {
  let component: CategorieCoachComponent;
  let fixture: ComponentFixture<CategorieCoachComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategorieCoachComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CategorieCoachComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
