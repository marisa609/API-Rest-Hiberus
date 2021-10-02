import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { usuariosDTO } from "../DTO/usuariosDTO";
import { usuariosDAOInterface } from "../interfaces/usuariosDAOInterface";

@Injectable({
    providedIn: "root"
})

//Todas las peticiones deben ser asíncronas, de lo contrario no podremos mostrar los datos actualizados sin la obligación de recargar la página

export class usuariosDAOService implements usuariosDAOInterface {
    //Url para  realizar la petición a la API
    public urlApi = "http://51.38.51.187:5050/api/v1/users";

    constructor(private httpClient: HttpClient) { }
    
    //LISTAMOS LOS USUARIOS
    async listarUsuarios(): Promise<usuariosDTO[]> {
        let showUsers: any = await this.httpClient.get<usuariosDTO>(this.urlApi).toPromise();
        return showUsers.items;
    }

    //CREAMOS UN NUEVO USUARIO
    async crearUsuario(usuario: usuariosDTO): Promise<boolean> {
        let anadido = true;
        await this.httpClient.post(this.urlApi,usuario).toPromise().catch(error=>{
            this.onError(error);
            anadido = false;
        });
        return anadido;
    }

    //EDITAMOS EL USUARIO
    async editarUsuario(usuario: usuariosDTO, id: string): Promise<boolean> {
        let actualizado = true;
        let urlActualizar = `${this.urlApi}/${id}`;
        await this.httpClient.put(urlActualizar, usuario).toPromise().catch(error => {
            this.onError(error);
            actualizado = false
        });
        return actualizado;
    }

    //BORRAMOS UN USUARIO. Recibimos un id para poder eliminarlo
    async borrarUsuario(id:string):Promise<boolean> {
        let borrado = true
        let urlBorrado = `${this.urlApi}/${id}`;
        await this.httpClient.delete(urlBorrado).toPromise().catch(error => {
            this.onError(error); 
            borrado = false
        });
        return borrado;
    }

    //GESTIÓN DE ERRORES. Los códigos de error provienen de la api
    private onError(err: any) {
        const ERROR_NOT_FOUND = 404;
        const ERROR_EMAIL_ALREADY_EXISTS = 409;
        const ERROR_USER_IS_NOT_VALIDATE = 601;

        if (err instanceof HttpErrorResponse) {
            switch (err.status) {
                case ERROR_NOT_FOUND:
                    alert('Usuario no encontrado o constraseña incorrecta');
                    break;
                case ERROR_EMAIL_ALREADY_EXISTS:
                    alert("El email ya existe");
                    break;
                case ERROR_USER_IS_NOT_VALIDATE:
                    alert("Usuario no válido");
                    break; 
            }
        }
    }
}