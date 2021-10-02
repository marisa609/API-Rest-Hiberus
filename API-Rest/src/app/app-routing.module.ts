import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GestionComponent } from './usuarios/gestion/gestion.component';
import { ListadoComponent } from './usuarios/gestion/listado/listado.component';

const routes: Routes = [
{ path: 'login', loadChildren: () => import('./login/login.module').then(m => m.LoginModule) }, 
{ path: 'usuarios', loadChildren: () => import('./usuarios/usuarios.module').then(m => m.UsuariosModule) }, 
//con esto redireccinamos a la pagina de login, si intentan entrar en la raiz
{ path: "", redirectTo: "login", pathMatch: "full" }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
