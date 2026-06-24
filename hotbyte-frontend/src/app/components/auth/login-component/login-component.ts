import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators,FormGroup } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../services/auth-service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';
@Component({
  selector: 'app-login-component',
  standalone:true,
  imports:[FormsModule,CommonModule,RouterModule, ReactiveFormsModule],
  templateUrl: './login-component.html',
  styleUrl: './login-component.css',
})


export class LoginComponent {

  form!: FormGroup;
  loading = false;

  // ✅ USE ONLY ONE (clean approach)
  errorsList: string[] = [];
  message: string = '';

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private cd: ChangeDetectorRef
  ) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  login() {

  // ✅ Reset state
  this.errorsList = [];
  this.message = '';

  const email = this.form.get('email')?.value;
  const password = this.form.get('password')?.value;

  // ✅ STEP 1: FRONTEND VALIDATION

  if (!email && !password) {
    this.errorsList = ['Email and password are required'];
    return;
  }

  if (!email) {
    this.errorsList = ['Email is required'];
    return;
  }

  if (!password) {
    this.errorsList = ['Password is required'];
    return;
  }

  // ✅ Email format validation
  const emailRegex = /^\S+@\S+\.\S+$/;

  if (!emailRegex.test(email)) {
    this.errorsList = ['Invalid email format'];
    return;
  }

  // ✅ STEP 2: API CALL (ONLY WHEN FRONTEND VALIDATION PASSES)

  this.loading = true;

  this.auth.login(this.form.value).subscribe({

    next: (res: any) => {

      localStorage.setItem('token', res.token);
      localStorage.setItem('role', res.role);

      this.message = 'Login successful ✅';

      setTimeout(() => {
        if (res.role === 'ADMIN') this.router.navigate(['/admin']);
        else if (res.role === 'RESTAURANT') this.router.navigate(['/restaurant']);
        else this.router.navigate(['/dashboard']);
      }, 800);
    },

    error: (err) => {

      console.log('FULL ERROR:', err);

      this.errorsList = [];

      // ✅ STEP 3: BACKEND ERROR HANDLING

      if (err.error && err.error.message) {
        this.errorsList.push(err.error.message);

      } else if (typeof err.error === 'string') {
        this.errorsList.push(err.error);

      } else if (err.status === 0) {
        this.errorsList.push('Server not reachable');

      } else {
        this.errorsList.push('Invalid credentials');
      }

      this.loading = false;
      // ✅ FORCE UI UPDATE (VERY IMPORTANT)
  this.cd.detectChanges();

    }
  });
  }
}
