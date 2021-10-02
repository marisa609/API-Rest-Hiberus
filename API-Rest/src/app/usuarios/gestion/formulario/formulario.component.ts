import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { usuariosDTO } from '../../DTO/usuariosDTO';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent {

  @Output() crear = new EventEmitter<{usuario: usuariosDTO, id: string}>();
  @Input() datosActualizados:usuariosDTO | null

  //Recogemos los datos del formulario y ñadimos algunas validaciones
  usuarioForm = this.fb.group({
    name: [null, Validators.required],
    surname: [null, Validators.required],
    email: [null, Validators.required],
    password: [null, Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(10),])],
  });

  idUsuarioActualizado:string;

  constructor(private fb: FormBuilder) {
    this.idUsuarioActualizado = '';
    this.datosActualizados = null;
  }

  ngOnChanges(cambios:SimpleChanges){
    if (cambios.datosActualizados && cambios.datosActualizados.currentValue != null){
      let usuario = cambios.datosActualizados.currentValue;
      this.usuarioForm.setValue({
        name: usuario.name,
        surname: usuario.surname,
        email: usuario.email,
        password: ''
      });
      this.idUsuarioActualizado = usuario.id;
    }
  }

  onSubmit(): void {
    let datos = new usuariosDTO(
      this.usuarioForm.controls.email.value, 
      this.usuarioForm.controls.password.value, 
      this.usuarioForm.controls.name.value, 
      this.usuarioForm.controls.surname.value, 
      '');
    console.log(datos);
    this.crear.emit({usuario: datos, id: this.idUsuarioActualizado});
    //Machacamos el usuario editado para poder insertar de nuevo
    this.idUsuarioActualizado = '';
    this.datosActualizados = null;
  }
  
}
