import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
import { AuthService } from '../../../Services/auth.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';
import { SecteurActiviteModel } from '../../../Models/secteuractivite.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    RouterLink,
    RouterModule,
    NgIf,
    NgFor,
    ReactiveFormsModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  
  secteurActivites: SecteurActiviteModel[] = [];

  selectedFile: File | null = null;
  selectedCV: File | null = null;
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Initialize the form
    this.registerForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(255)]],
      email: ['', [Validators.required, Validators.email, Validators.maxLength(255)]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      password_confirmation: ['', [Validators.required]],
      photo: ['', [Validators.required]],
      adresse: ['', [Validators.required, Validators.maxLength(255)]],
      telephone: ['', [Validators.required, Validators.maxLength(20), Validators.minLength(9)]],
      role: ['', [Validators.required]],
      cv: [''],
      secteur_activite_id: ['', [Validators.required]]
    }, { validator: this.checkPasswords });

    // Fetch the list of Secteur Activites
    this.authService.getSecteurActivites().subscribe(
      (response: any) => {
        console.log('Data:', response); // Vérifiez ici ce que vous recevez
        this.secteurActivites = response; // Assurez-vous de prendre le tableau 'data'
      },
      (error: any) => {
        console.error('Error:', error); // En cas d'erreur, affichez-la
      }
    );
    
    
  }

  // Custom validator to check if passwords match
  checkPasswords(group: FormGroup) {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('password_confirmation')?.value;
    return password === confirmPassword ? null : { notSame: true };
  }

  // Handle file selection for photo
  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
        const file = input.files[0];
        const maxSize = 5 * 1024 * 1024; // Exemple : 5MB

        if (file.size > maxSize) {
            console.error('Le fichier est trop grand.');
            return;
        }

        const allowedTypes = ['image/jpeg', 'image/png'];
        if (!allowedTypes.includes(file.type)) {
            console.error('Type de fichier non supporté.');
            return;
        }

        this.selectedFile = file;
    }
}


onCVSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
        this.selectedCV = input.files[0];
    }
}


  // Handle form submission
  onSubmit() {
    if (this.registerForm.invalid) {
      return;
    }

    const formData = new FormData();
    formData.append('name', this.registerForm.get('name')!.value);
    formData.append('email', this.registerForm.get('email')!.value);
    formData.append('password', this.registerForm.get('password')!.value);
    formData.append('password_confirmation', this.registerForm.get('password_confirmation')!.value);
    formData.append('photo', this.selectedFile!);
    formData.append('adresse', this.registerForm.get('adresse')!.value);
    formData.append('telephone', this.registerForm.get('telephone')!.value);
    formData.append('role', this.registerForm.get('role')!.value);
    if (this.selectedCV) {
        formData.append('cv', this.selectedCV);
    }
    formData.append('secteur_activite_id', this.registerForm.get('secteur_activite_id')!.value);
    

    this.authService.register(formData).subscribe(
      response => {
        console.log('Registration successful', response);
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Inscription réussie",
          showConfirmButton: false,
          timer: 1500
        });
        this.router.navigate(['/login']); // Redirect after successful registration
      },
      error => {
        console.error('Registration failed', error);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "L'inscription a échoué!",
          footer: '<a href="#">Why do I have this issue?</a>'
        });
      }
    );
  }
  showPassword: boolean = false;

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }
}
