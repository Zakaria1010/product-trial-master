import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [ReactiveFormsModule, CardModule, CommonModule, ButtonModule],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})

export class AuthComponent implements OnInit {
  isLoginMode = true;
  authForm!: FormGroup;
  isLoading = false;
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient, // optional now
    private authService: AuthService
  ) {
    this.authForm = this.fb.group({
      username: ['', [Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['']
    });
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.isLoginMode = params['mode'] !== 'register';
      this.updateFormValidation();
    });
  }

  updateFormValidation() {
    if (this.isLoginMode) {
      this.authForm.get('email')?.clearValidators();
      this.authForm.get('confirmPassword')?.clearValidators();
    } else {
      this.authForm.get('email')?.setValidators([Validators.required, Validators.email]);
      this.authForm.get('confirmPassword')?.setValidators([Validators.required]);
    }
    this.authForm.get('email')?.updateValueAndValidity();
    this.authForm.get('confirmPassword')?.updateValueAndValidity();
  }

  onSubmit() {
    if (this.authForm.invalid) {
      return;
    }

    this.isLoading = true;
    this.errorMessage = null;

    const { username, email, password, confirmPassword } = this.authForm.value;

    if (!this.isLoginMode) {
      // Call service
      this.authService.register({ username, email, password, confirmPassword }).subscribe({
        next: (response) => {
          console.log('Registration successful', response);
          this.isLoading = false;
          this.router.navigate(['/']); // or wherever you want to redirect
        },
        error: (error) => {
          console.error('Registration error:', error);
          this.errorMessage = 'Registration failed. Please try again.';
          this.isLoading = false;
        }
      });
    } else {
      // handle login here
      this.authService.login({ email, password }).subscribe({
        next: (response) => {
          localStorage.setItem('token', response.token);
          console.log('Login success', response);
          this.router.navigate(['/']); // or wherever you want to go
        },
        error: (err) => {
          console.error('Login failed:', err);
          this.errorMessage = 'Invalid username or password.';
          this.isLoading = false;
        }
      });      
      this.isLoading = false;
    }
  }
}
