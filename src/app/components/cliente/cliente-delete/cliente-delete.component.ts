import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ClienteService } from 'src/app/services/cliente.service';

import { Cliente } from '../../../models/cliente';

@Component({
  selector: 'app-cliente-delete',
  templateUrl: './cliente-delete.component.html',
  styleUrls: ['./cliente-delete.component.css']
})
export class ClienteDeleteComponent implements OnInit {

  cliente: Cliente = {
    id: '',
    nome: '',
    cpf: '',
    email: '',
    senha: '',
    perfis: [],
    dataCriacao: ''
  }

  constructor(
    private clienteService: ClienteService,
    private toast: ToastrService,
    private router: Router,
    private activedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.cliente.id = this.activedRoute.snapshot.paramMap.get('id');
    this.findById();
  }

  findById(): void {
    this.clienteService.findById(this.cliente.id).subscribe(response => {
      response.perfis = [];
      this.cliente = response;
    });
  }
  
  delete(): void {
    this.clienteService.delete(this.cliente.id).subscribe(() => {
      this.toast.success('cliente deletado com sucesso', 'Deletado');
      this.router.navigate(['clientes']);
    }, ex => {
      if (ex.error.errors) {
        ex.error.errors.forEach(element => {
          this.toast.error(element.message);
        })
      } else {
        this.toast.error(ex.error.message);
      }
    })
  }
}
