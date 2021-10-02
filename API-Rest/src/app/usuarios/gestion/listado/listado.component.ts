import { ChangeDetectorRef } from '@angular/core';
import { AfterViewInit, Component, EventEmitter, Input, Output, SimpleChange, SimpleChanges, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { usuariosDAOService } from '../../DAO/usuariosDAOService';
import { usuariosDTO } from '../../DTO/usuariosDTO';
import { usuariosInterface } from '../../interfaces/usuariosInterfaces';
import { ListadoDataSource} from './listado-datasource';


@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.css']
})
export class ListadoComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<usuariosInterface>;
  
  dataSource: ListadoDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'name', 'surname', 'email', 'edit', 'delete'];

  @Input() listaUsuarios: usuariosDTO[];

  //envío información al padre
  @Output() borrar = new EventEmitter<string>();
  @Output() actualizar = new EventEmitter<usuariosDTO>();
  

  constructor(private usuariosDAOService: usuariosDAOService) {
    this.listaUsuarios = [];
    this.dataSource = new ListadoDataSource(this.listaUsuarios);
  }

  async listarUsuarios() {
    this.listaUsuarios = await this.usuariosDAOService.listarUsuarios();
    this.dataSource = new ListadoDataSource(this.listaUsuarios); 
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  
  }

  actualizarUsuario(datos: usuariosDTO){
    this.actualizar.emit(datos);
  }

  borrarUsuario(id: string){
    this.borrar.emit(id);
  }
  
  ngAfterViewInit(): void {
   this.listarUsuarios();
  }

  ngOnInit(){
  
  }

  //ACtualizamos la tabla cuando detectamos cambios
  ngOnChanges(cambios: SimpleChanges) {
    this.listaUsuarios = cambios.listaUsuarios.currentValue
    this.dataSource = new ListadoDataSource(this.listaUsuarios);
    //Si la tabla no existe la creamos
    if (typeof (this.table) != "undefined") {
      this.dataSource = new ListadoDataSource(this.listaUsuarios);
      this.listarUsuarios();
    }
  }
}
