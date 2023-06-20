import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from 'src/app/shared/services/api.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.css']
})
export class AuthPageComponent implements OnInit{
  loginForm: FormGroup = new FormGroup({
    username: new FormControl('', [
      Validators.email
    ]),
    password: new FormControl('', [
      Validators.maxLength(15),
      Validators.minLength(6)
    ])
  });

  private _apiService = inject(ApiService);
  private router = inject(Router);

  ngOnInit(): void {
    this._apiService.logout(this.router);
  }

  login(): void {
    const { value } = this.loginForm;
    this._apiService.login(value).subscribe({
      next: (res) => {
        localStorage.setItem('user_token', res.token);
        this.router.navigate(['/','home']);
      },
      error: (err) => {
        alert('Algo salió mal, vuelva a intentarlo más tarde.');
        console.error('Algo salió mal, vuelva a intentarlo más tarde. ', err);
      }
    });
  }

}
