import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { Cliente, Usuario, LocalUser } from '../_models';
import { ClienteService } from '../_services';
import { StorageService } from '../_services/storage.service';
import { Router } from '@angular/router';

@Component({
    templateUrl: 'home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    clientes: Cliente[] = [];

    constructor(
        private clienteService: ClienteService, 
        private storage: StorageService, 
        private router: Router) {
    }

    ngOnInit() {
        this.loadAllClientes();
    }

    deleteUser(id: number) {
        this.clienteService.delete(id).pipe(first()).subscribe(() => { 
            this.loadAllClientes() 
        });
    }

    isAdmin() {
        return this.storage.isAdmin();
    }

    private loadAllClientes() {
        this.clienteService.getAll().pipe(first()).subscribe(clientes => { 
            this.clientes = clientes; 
        });
    }
}