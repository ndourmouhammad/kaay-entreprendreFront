import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { NgxEditorModule } from 'ngx-editor';
import { ReactiveFormsModule } from '@angular/forms';
import { Editor } from 'ngx-editor';
import { GuideService } from '../../../Services/guide.service';

import DOMPurify from 'dompurify';

@Component({
  standalone: true,
  imports: [
    NgxEditorModule,
    ReactiveFormsModule
  ],
  selector: 'app-etape-modal',
  templateUrl: './etape-modal.component.html',
  styleUrls: ['./etape-modal.component.css']
})
export class EtapeModalComponent implements OnInit, OnDestroy {
  @Input() etape: any;  // Accept the selected step as an input
  etapeForm: FormGroup;
  editor: Editor;

  constructor(public activeModal: NgbActiveModal, private fb: FormBuilder, private guideService: GuideService) {  
    this.etapeForm = this.fb.group({
      libelle: ['', Validators.required],
      pieces_jointes: [null],
      description: ['', Validators.required],
      guide_id: [1, Validators.required]
    });

    this.editor = new Editor();
  }

  ngOnInit(): void {
    // If editing, initialize form with the selected step's data
    if (this.etape) {
      this.etapeForm.patchValue({
        libelle: this.etape.libelle,
        description: this.etape.description,
        guide_id: this.etape.guide_id,
        // You may need additional logic for pieces_jointes if editing
      });
    }
  }

  onSubmit(): void {
    if (this.etapeForm.valid) {
      const formData = new FormData();
      formData.append('libelle', this.etapeForm.get('libelle')?.value);
      
      // Sanitize the description before appending it to formData
      const sanitizedDescription = DOMPurify.sanitize(this.etapeForm.get('description')?.value);
      formData.append('description', sanitizedDescription);

      // Add guide_id = 1
      formData.append('guide_id', '1');

      // Add file if present
      const file = this.etapeForm.get('pieces_jointes')?.value;
      if (file) {
        formData.append('pieces_jointes', file);
      }

      if (this.etape) {
        // If editing, call the update method
        this.guideService.updateEtape(formData, this.etape.id).subscribe({
          next: (response) => {
            console.log('Success:', response);
            this.activeModal.close('submit');
          },
          error: (error) => {
            console.error('Error:', error);
          }
        });
      }
      else {
        // If adding, call the add method
        this.guideService.addEtape(formData).subscribe({
          next: (response) => {
            console.log('Success:', response);
            this.activeModal.close('submit');
          },
          error: (error) => {
            console.error('Error:', error);
          }
        });
      }
    }
  }

  onFileChange(event: Event, controlName: string): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.etapeForm.patchValue({ [controlName]: file });
    }
  }

  ngOnDestroy(): void {
    this.editor.destroy();
  }

  getControl(name: string) {
    return this.etapeForm.get(name) as FormControl;
  }
}
