import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class CepService {
    constructor(private http: HttpClient) { }

    consultaCEP(cep: string):Observable<any> {
        cep = cep.replace(/\D/g,'');
        if(cep != '') {
            const validaCepRgx = /^[0-9]{8}$/;
            if(validaCepRgx.test(cep)) {
                return this.http.get(`https://viacep.com.br/ws/${cep}/json/`);
            } 
        }
    }
}