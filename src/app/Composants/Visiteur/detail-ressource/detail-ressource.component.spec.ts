import { ComponentFixture, TestBed } from '@angular/core/testing';

<<<<<<<< HEAD:src/app/Composants/Visiteur/forum/forum.component.spec.ts
import { ForumComponent } from './forum.component';

describe('ForumComponent', () => {
  let component: ForumComponent;
  let fixture: ComponentFixture<ForumComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ForumComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ForumComponent);
========
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
>>>>>>>> feature/pageDétailR:src/app/Composants/Visiteur/detail-ressource/detail-ressource.component.spec.ts
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
