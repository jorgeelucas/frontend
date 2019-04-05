import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { LocalUser } from '../_models';
import { StorageService } from './storage.service';

@Injectable()
export class AuthenticationService {
    constructor(private http: HttpClient, private storage: StorageService) { }

    login(username: string, password: string) {
        return this.http.post(
            `${config.apiUrl}/login`, 
            { 
                login: username, 
                senha: password
            },
            {
                observe: 'response'
            });
    }

    successfullLogin(authorizationValue: string, role: string) {
        let tok = authorizationValue.substring(7);
        let usuarioLogado : LocalUser = {
            token: tok,
            role: role
        }
        this.storage.setLocalUser(usuarioLogado);
    }

    logout() {
        this.storage.setLocalUser(null);
    }
}