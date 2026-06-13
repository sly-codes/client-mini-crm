import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../data-access/auth.service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  public errorMessage: string | null = null;

  form = this.fb.group({
    email: ['issa@sly.codes', [Validators.required, Validators.email]],
    password: ['12345678', [Validators.required, Validators.minLength(8)]],
  });

  onSubmit() {
    const { email, password } = this.form.value;

    this.authService.login(email!, password!).subscribe({
      next: (response) => {
        localStorage.setItem('access_token', response.access_token);

        this.router.navigate(['/companies']);
        console.log('log In');
      },
      error: (err) => {
        this.errorMessage = 'Email ou mot de passe incorrect';
      },
    });
  }
}
