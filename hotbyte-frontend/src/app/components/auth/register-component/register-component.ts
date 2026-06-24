import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth-service';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-register-component',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './register-component.html',
  styleUrl: './register-component.css',
})
export class RegisterComponent {
  form!: FormGroup;
  loading = false;
  // ✅ CLEAN STATE MANAGEMENT
  errorsList: string[] = [];
  message: string = '';
  constructor(private fb: FormBuilder, private auth: AuthService,
    private router: Router, private cd: ChangeDetectorRef ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(5)]],
      phone: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      address: [''],
      gender: [''],
      role: ['USER'],
      restaurantName: [''],
      location: ['']
    });
  }
  register() {
    // ✅ RESET STATE
    this.errorsList = [];
    this.message = '';
    const f = this.form.value;
    // ✅ STEP 1: FRONTEND VALIDATION
    if (!f.name) {
      this.errorsList = ['Name is required'];
      return;
    }
    if (!f.email) {
      this.errorsList = ['Email is required'];
      return;
    }
    if (!f.password) {
      this.errorsList = ['Password is required'];
      return;
    }
    // ✅ Email format
    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(f.email)) {
      this.errorsList = ['Invalid email format'];
      return;
    }
    // ✅ Password length
    if (f.password.length < 5) {
      this.errorsList = ['Password must be at least 5 characters'];
      return;
    }
    // ✅ Phone validation
    if (!/^[0-9]{10}$/.test(f.phone)) {
      this.errorsList = ['Phone must be 10 digits'];
      return;
    }
    // ✅ Restaurant validation
    if (f.role === 'RESTAURANT') {
      if (!f.restaurantName) {
        this.errorsList = ['Restaurant name required'];
        return;
      }
      if (!f.location) {
        this.errorsList = ['Location required'];
        return;
      }
    }
    // ✅ STEP 2: API CALL
    this.loading = true;
    this.auth.register(f).subscribe({
      next: () => {
        this.message = 'Registration successful ✅';
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 1000);
      },
      error: (err) => {
        console.log('FULL ERROR:', err);
        this.errorsList = [];
        // ✅ BACKEND ERROR HANDLING
        if (err.error?.errors && Array.isArray(err.error.errors)) {
          this.errorsList = err.error.errors;
        }
        else if (err.error?.message) {
          this.errorsList.push(err.error.message);
        }
        else if (typeof err.error === 'string') {
          this.errorsList.push(err.error);
        }
        else if (err.status === 0) {
          this.errorsList.push('Server not reachable');
        }
        else {
          this.errorsList.push('Registration failed');
        }
        this.loading = false;
        // ✅ FORCE UI UPDATE
        this.cd.detectChanges();
      }
    });
  }
}
