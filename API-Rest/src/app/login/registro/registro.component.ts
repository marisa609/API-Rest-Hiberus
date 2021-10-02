import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {
  
  private urlAPI = "http://51.38.51.187:5050/api/v1/auth/sign-up";

  fotoFondo:string = "assets/fondo2.webp";
  fotoHiberusLogin:string = "assets/hiberusLogin.jpg";

  registrationForm = this.fb.group({
    name: [null, Validators.required],
    surname: [null, Validators.required],
    email: [null, Validators.required],
    password: [null, Validators.required],
  });


  constructor(private fb: FormBuilder, private httpClient: HttpClient, private router: Router) {}

  onSubmit(): void {
    this.httpClient
    .post<any>(this.urlAPI, {
      name: this.registrationForm.value.name,
      surname: this.registrationForm.value.surname,
      email:this.registrationForm.value.email,
      password:this.registrationForm.value.password
    })
    .subscribe(
      token => {
        sessionStorage.setItem('token', JSON.stringify(token));
        this.router.navigate(["/login"]);
      },
      error => this.onError(error));
  }

    //Gestión de errores 
    private onError(err: any) {
      const ERROR_EMPTY_RESPONSE = 204;
      const ERROR_EMAIL_EXISTS = 409;
      
      if (err instanceof HttpErrorResponse) {
        if (err.status == ERROR_EMAIL_EXISTS) {
          alert("Email already exist");
        } else {
          alert("unknown error");
        }
      }
  
    }

  /*public registrar(){
    this.router.navigate(["/login"]);
  } */
}
