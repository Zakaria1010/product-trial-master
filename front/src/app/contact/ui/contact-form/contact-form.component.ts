import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { delay, Observable, of } from 'rxjs';

// Example Async Validator for the message field
export function messageLengthAsyncValidator(control: AbstractControl): Observable<any> {
  const forbiddenMessage = 'Forbidden message';  // You can replace this with any check
  return of(control.value === forbiddenMessage ? { forbiddenMessage: true } : null).pipe(
    delay(1000) // Simulate async operation (like an API call)
  );
}
@Component({
  selector: 'app-contact-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './contact-form.component.html',
  styleUrl: './contact-form.component.css'
})
export class ContactFormComponent {
  contactForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    // Initialisation du formulaire avec des validations
    this.contactForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]], // Email obligatoire et valide
      message: [
        '', 
        [Validators.required, Validators.maxLength(300)]  // Message obligatoire
      ]    
    });
  }

    // Méthode pour gérer l'envoi du formulaire
    onSubmit(): void {
      this.contactForm.get('message')?.markAsTouched();
      this.contactForm.get('email')?.markAsTouched();
      const messageLength = this.contactForm.get('message')?.value.length;
        console.log('Message Length:', messageLength); 

      this.contactForm.get('message')?.updateValueAndValidity();
      this.contactForm.updateValueAndValidity();  // For the entire form

      console.log('Message Control Errors:', this.contactForm.get('message')?.errors);
      if (this.contactForm.valid) {
        const formData = this.contactForm.value;
        console.log('Form data:', formData); // Log des données, vous pouvez remplacer par l'appel à une API ou service
        alert('Message envoyé avec succès!');
        this.contactForm.reset(); // Réinitialiser le formulaire après envoi
      } else {
        console.log('Le formulaire est invalide');
      }
    }
}
