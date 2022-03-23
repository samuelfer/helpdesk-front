import { TecnicoService } from './../../../services/tecnico.service';
import { ClienteService } from './../../../services/cliente.service';
import { Tecnico } from './../../../models/tecnico';
import { Cliente } from './../../../models/cliente';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { ChamadoService } from './../../../services/chamado.service';
import { Chamado } from 'src/app/models/chamado';

@Component({
  selector: 'app-chamado-create',
  templateUrl: './chamado-create.component.html',
  styleUrls: ['./chamado-create.component.css']
})
export class ChamadoCreateComponent implements OnInit {

  chamado: Chamado = {
    prioridade: '',
    status: '',
    titulo: '',
    observacoes: '',
    tecnico: '',
    cliente: '',
    nomeCliente: '',
    nomeTecnico: '',
  }

  clientes: Cliente[] = [];
  tecnicos: Tecnico[] = [];

  prioridade: FormControl = new FormControl(null, [Validators.required]);
  status: FormControl = new FormControl(null, [Validators.required]);
  titulo: FormControl = new FormControl(null, [Validators.required, Validators.minLength(5)]);
  observacoes: FormControl = new FormControl(null, [Validators.required, Validators.minLength(10)]);
  tecnico: FormControl = new FormControl(null, [Validators.required]);
  cliente: FormControl = new FormControl(null, [Validators.required]);

  constructor(
    private chamadoService: ChamadoService,
    private clienteService: ClienteService,
    private tecnicoService: TecnicoService,
    private toast: ToastrService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.findAllClientes();
    this.findAllTecnicos();
  }

  create(): void {
    this.chamadoService.create(this.chamado).subscribe(() => {
      this.toast.success('Chamado cadastrado com sucesso', 'Cadastro');
      this.router.navigate(['chamados']);
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

  findAllClientes(): void {
    this.clienteService.findAll().subscribe(response => {
      this.clientes = response;
    })
  }

  findAllTecnicos(): void {
    this.tecnicoService.findAll().subscribe(response => {
      this.tecnicos = response;
    })
  }

  validaCampos(): boolean {
    return this.prioridade.valid && this.status.valid 
      && this.titulo.valid && this.observacoes.valid
      && this.tecnico.valid && this.cliente.valid;
  }
}
