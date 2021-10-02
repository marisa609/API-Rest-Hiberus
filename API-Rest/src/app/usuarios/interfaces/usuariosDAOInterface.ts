import { usuariosDTO } from "../DTO/usuariosDTO";

export interface usuariosDAOInterface {
    urlApi: string;
    listarUsuarios(): Promise<usuariosDTO[]>;
    crearUsuario(usuario:usuariosDTO): Promise<boolean>;
    borrarUsuario(id: string): Promise<boolean>;
    editarUsuario(usuario:usuariosDTO, id:string): Promise<boolean>;
}