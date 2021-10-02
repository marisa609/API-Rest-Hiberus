import { Component, OnInit } from '@angular/core';
import { Mongoose } from 'mongoose';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  //private bd;

  constructor() { }

  ngOnInit(): void {
    //Ejemplo de conexion de base de datos (en este caso no es necesario pero es solo para contextualizar la explicacion)
    /*this.bd = Mongoose.on(
      //definimos las funciones para la conexion a la base de datos 
    )*/
    //aqui ejemplo de esquema para crear schema que es un objeto BSON, que se podria usar para 
    //insertar en mondo directamente 
   /* const Schema = mongoose.Schema;
    const ObjectId = Schema.ObjectId;

    const BlogPost = new Schema({
      author: ObjectId,
      title: String,
      body: String,
      date: Date
    }); */

    /*var mongoose = require("mongoose");
    var id = mongoose.Types.ObjectId(); */

  }

}
