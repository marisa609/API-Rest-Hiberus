import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsuariosRoutingModule } from './usuarios-routing.module';
import { UsuariosComponent } from './usuarios.component';
import { HomeComponent } from './home/home.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { LayoutModule } from '@angular/cdk/layout';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptorService } from './auth-interceptor-service';
import { GestionComponent } from './gestion/gestion.component';
import { FormularioComponent } from './gestion/formulario/formulario.component';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { ReactiveFormsModule } from '@angular/forms';
import { ListadoComponent } from './gestion/listado/listado.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { usuariosDAOService } from './DAO/usuariosDAOService';

import { MatSnackBarModule } from '@angular/material/snack-bar';

import { ShellModule } from '../shell/shell.module';



@NgModule({
  declarations: [
    UsuariosComponent,
    HomeComponent,
    GestionComponent,
    FormularioComponent,
    ListadoComponent
  ],
  imports: [
    CommonModule,
    UsuariosRoutingModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    LayoutModule,
    MatInputModule,
    MatSelectModule,
    MatRadioModule,
    ReactiveFormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    HttpClientModule,
    ShellModule,
    MatSnackBarModule
  ],
  providers: [
    //aquin indicamos que queremos usar el interceptor para todas las llamadas que pasan
    //por este modulo a web service externos, nos interesa, para añadir
    //automaticamente el token en todas las llamadas
    {
      provide: HTTP_INTERCEPTORS,
      //indicamos que clase implementa este interceptor
      useClass: AuthInterceptorService,
      //se usa para que no sea singleton, es decir
      //nos permita tener una instancia por cada peticion
      multi:true
    },
    //para poder usar el servicio
    usuariosDAOService
  ]
})
export class UsuariosModule { }
