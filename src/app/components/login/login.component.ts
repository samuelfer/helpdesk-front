import { Router } from '@angular/router';
import { Credenciais } from './../../models/credenciais';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  credenciais: Credenciais = {
    email: '',
    senha: ''
  }

  email = new FormControl(null, Validators.email);
  senha = new FormControl(null, Validators.minLength(3));

  constructor(
    private toast: ToastrService,
    private authService: AuthService,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  logar() {
    this.authService.authenticate(this.credenciais).subscribe(resposta => {
      this.authService.successFullLogin(resposta.headers.get('Authorization').substring(7));
      this.router.navigate(['']);
    }, () => {
      this.toast.error('Usuário e/ou senha inválidos');
    });
    
  }

  validaCampos(): boolean {
    return this.email.valid && this.senha.valid;
  }

}
