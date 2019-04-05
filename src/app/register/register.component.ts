import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';

import { AlertService, ClienteService, CepService } from '../_services';
import { first } from 'rxjs/internal/operators/first';

@Component({templateUrl: 'register.component.html'})
export class RegisterComponent implements OnInit {
    registerForm: FormGroup;
    loading = false;
    submitted = false;
    telefonesFormulario = [''];

    constructor(
        private formBuilder: FormBuilder,
        private cepService: CepService,
        private router: Router,
        private clienteService: ClienteService,
        private alertService: AlertService) { }

    ngOnInit() {
        this.registerForm = this.formBuilder.group({
            nome: ['', Validators.required],
            cpf: ['', Validators.required],
            endereco: this.formBuilder.group({
                cep: ['', Validators.required],
                logradouro: ['', Validators.required],
                bairro: ['', Validators.required],
                cidade: ['', Validators.required],
                uf: ['', Validators.required],
                complemento: ['']
            }),
            telefones: ['', [Validators.required]],
            emails: ['', [Validators.required]]
        });
    }

    preencheEndereco(cep: string) {
        if(cep!=null && cep !== '') {
            this.limparCamposEndereco();
            this.cepService.consultaCEP(cep)
            .subscribe(data => {
                this.registerForm.patchValue({
                    endereco: {
                        logradouro: data.logradouro,
                        bairro: data.bairro,
                        cidade: data.localidade,
                        uf: data.uf,
                        complemento: data.complemento
                    }
                });
            });
        }
    }

    limparCamposEndereco() {
        this.registerForm.patchValue({
            endereco: {
                logradouro: '',
                bairro: '',
                cidade: '',
                uf: '',
                complemento: ''
            }
        });
    }

    get f() { return this.registerForm.controls; }

    onSubmit() {
        this.submitted = true;

        if (this.registerForm.invalid) {
            return;
        }

        this.loading = true;
        let tels = this.registerForm.controls.telefones.value.split(";");
        let ems = this.registerForm.controls.emails.value.split(";");
        this.registerForm.patchValue({
            telefones: tels,
            emails: ems
        });
        this.clienteService.register(this.registerForm.value)
            .pipe(first())
            .subscribe(
                data => {
                    this.alertService.success('Registrado com sucesso', true);
                    this.router.navigate(['/']);
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
    }
}
