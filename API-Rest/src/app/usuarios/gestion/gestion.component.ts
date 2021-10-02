import { Component, OnInit } from '@angular/core';
import { usuariosDAOService } from '../DAO/usuariosDAOService';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { usuariosDTO } from '../DTO/usuariosDTO';

@Component({
  selector: 'app-gestion',
  templateUrl: './gestion.component.html',
  styleUrls: ['./gestion.component.css']
})
export class GestionComponent implements OnInit {

  fotoFondo:string = "assets/fondo2.webp";
  //Lista de usuarios del tipo usuariosDTO, contiene los datos que provienen de la API
  listaUsuarios : usuariosDTO[]=[];
  //Contiene el usuario editado
  datosActualizados : usuariosDTO | null;
  //Gestión de mensajes
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
 
  //Inyectamos nuestro servicio que es el encargado de comunicarse con la api
  //También inyectamos la clase encargada de gestionar los mensajes del usuario de Material
  constructor(private usuariosDAOService: usuariosDAOService, private _snackBar: MatSnackBar) { 
    this.listaUsuarios = [];
    this.datosActualizados = null;
  }

  ngOnInit(): void {
    
  }

  //CREAR USUARIO. Recibe los datos del formulario que nos manda el hijo
  async crearUsuario(datos: any) {
    //Generamos un id de mongoose
    var mongoose = require("mongoose");
    var id = mongoose.Types.ObjectId();
    //Si no tenemos id  significa que el usuario no existe y que lo podemos crear
    if (datos.id == '') {
      datos.usuario.id = id.toString();
      //Llamamos al servicio para que cree al usuario
      this.usuariosDAOService.crearUsuario(datos.usuario);
      //Actualizamos la tabla
      this.listaUsuarios = await this.usuariosDAOService.listarUsuarios();
      //Lanzamos el mensaje para el usuario
      this.openSnackBar('usuario insertado satisfactoriamente');
    //Si por el contrario el id no existe, quiere decir que no estamos insertando, sino que estamos editando
    } else {
      //Llamamos al servicio para que edite al usuario
      await this.usuariosDAOService.editarUsuario(datos.usuario, datos.id);
      //Actualizamos la tabla
      this.listaUsuarios = await this.usuariosDAOService.listarUsuarios();
      //Una vez que hemos editado, debemos borrar el id para poder volver a insertar nuevos registros
      datos.usuario.id = "";
      //Lanzamos el mensaje para el usuario
      this.openSnackBar('usuario editado satisfactoriamente');
    }
  }

  //ACTUALIZAMOS LOS DATOS DEL USUARIO. Desde el hijo nos llegan los datos del usuario
  usuarioActualizado(usuario: usuariosDTO){
    //Llamamos al constructor de usuario para instanciar al usuario con sus nuevos datos
    this.datosActualizados = new usuariosDTO(usuario.email, usuario.password, usuario.name, usuario.surname, usuario.id);
  }

  //BORRAMOS EL USUARIO. Recibe su id
  async borrarUsuario(id:string){
    //Borramos el usuario
    await this.usuariosDAOService.borrarUsuario(id);
    //Actualizamos la tabla
    this.listaUsuarios = await this.usuariosDAOService.listarUsuarios();
    //Lanzamos el mensaje para el usuario
    this.openSnackBar('usuario eliminado satisfactoriamente');
  }

  //MENSAJES PARA EL USUARIO
  openSnackBar(mensaje: string) {
    this._snackBar.open(mensaje, 'Cerrar', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 2000,
    });
  }
}
