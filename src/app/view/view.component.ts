import { Component, OnInit } from '@angular/core';
import { Cliente, LocalUser } from '../_models';
import { ActivatedRoute, Router } from '@angular/router';
import { ClienteService, AlertService } from '../_services';
import { first } from 'rxjs/operators';
import { StorageService } from '../_services/storage.service';

@Component({templateUrl: 'view.component.html'})
export class ViewComponent implements OnInit {
    
    cliente: Cliente;
    id: string;

    constructor(
                private route: ActivatedRoute, 
                private router: Router, 
                private service: ClienteService,
                private alertService: AlertService,
                private storage: StorageService) { 
        this.id = this.route.snapshot.params['id'];
        this.service.getById(Number(this.id)).pipe(first()).subscribe(cliente => { 
            this.cliente = cliente;
        });
    }

    deletar(id: number) {
        this.service.delete(id).pipe(first()).subscribe(() => { 
            this.alertService.success('Registrado com sucesso', true);
            this.router.navigate(['/']);
        });
    }

    isAdmin() {
        return this.storage.isAdmin();
    }

    ngOnInit() {}
}
