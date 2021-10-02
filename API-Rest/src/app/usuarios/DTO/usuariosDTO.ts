import { StickyDirection } from "@angular/cdk/table";
import { usuariosInterface } from "../interfaces/usuariosInterfaces";

//ayuda a la escalabilidad, organizacion del código 
export class usuariosDTO implements usuariosInterface {
    email: string;
    password: string;
    name: string;
    surname: string;
    id: string;

    constructor(email: string, password: string, name: string, surname: string, id: string) {
        this.email = email;
        this.password = password;
        this.name = name;
        this.surname = surname;
        this.id = id;
    }

    getEmail() {
        return this.email;
    }
    setEmail(email: string) {
        if (email.length > 12) {
            this.email = email;
        }
    }

    getPassword() {
        return this.password;
    }
    setPassword(password: string) {
        this.password = password;
    }

    getName() {
        return this.name;
    }
    setName(name: string) {
        this.name = name;
    }

    getSurname() {
        return this.surname;
    }
    setSurname(surname: string) {
        this.surname = surname;
    }
    getId() {
        return this.id;
    }
    setId(id: string) {
        this.id = id;
    }

}