import { Injectable } from "@angular/core";
import { LocalUser } from "../_models";

@Injectable()
export class StorageService {

    getLocalUser(): LocalUser {
        let usuarioLogado = localStorage.getItem('usuarioLogado');
        if(usuarioLogado == null) {
            return null;
        } else {
            return JSON.parse(usuarioLogado);
        }
    }

    setLocalUser(localUser: LocalUser) {
        if(localUser == null) {
            localStorage.removeItem('usuarioLogado');
        } else {
            localStorage.setItem('usuarioLogado', JSON.stringify(localUser));
        }
    }

    isAdmin() {
        return JSON.parse(localStorage.getItem('usuarioLogado')).role.endsWith('admin');
    }

}