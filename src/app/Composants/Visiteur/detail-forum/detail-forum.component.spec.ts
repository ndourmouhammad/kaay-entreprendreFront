import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailForumComponent } from './detail-forum.component';

describe('DetailForumComponent', () => {
  let component: DetailForumComponent;
  let fixture: ComponentFixture<DetailForumComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailForumComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetailForumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
