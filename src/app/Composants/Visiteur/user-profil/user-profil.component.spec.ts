import { ComponentFixture, TestBed } from '@angular/core/testing';

<<<<<<<< HEAD:src/app/Composants/Commun/login/login.component.spec.ts
import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LoginComponent);
========
import { UserProfilComponent } from './user-profil.component';

describe('UserProfilComponent', () => {
  let component: UserProfilComponent;
  let fixture: ComponentFixture<UserProfilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserProfilComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserProfilComponent);
>>>>>>>> feature/Userprofil:src/app/user-profil/user-profil.component.spec.ts
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
