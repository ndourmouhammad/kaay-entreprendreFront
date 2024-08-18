import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailRessourceComponent } from './detail-ressource.component';

describe('DetailRessourceComponent', () => {
  let component: DetailRessourceComponent;
  let fixture: ComponentFixture<DetailRessourceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailRessourceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetailRessourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
