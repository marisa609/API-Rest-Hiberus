import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {

  fotoHiberusLogin:string = "assets/hiberusLogin.jpg";

  constructor(private router:Router) { }

  //Método encargado de eliminar la sesisión del usuario y dirigir la navegacion a la página inicial
  cerrarSesion() {
    sessionStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  ngOnInit(): void {
  }

}
