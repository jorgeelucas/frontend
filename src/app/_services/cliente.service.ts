import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Cliente } from '../_models';

@Injectable()
export class ClienteService {
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<Cliente[]>(`${config.apiUrl}/api/clientes`);
    }

    getById(id: number) {
        return this.http.get<Cliente>(`${config.apiUrl}/api/clientes/` + id);
    }

    register(cliente: Cliente) {
        return this.http.post(`${config.apiUrl}/api/clientes`, cliente);
    }

    update(cliente: Cliente) {
        return this.http.put(`${config.apiUrl}/api/clientes/` + cliente.id, cliente);
    }

    delete(id: number) {
        return this.http.delete(`${config.apiUrl}/api/clientes/` + id);
    }
}