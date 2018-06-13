import { UserServiceService } from './../services/user-service.service';
import { AuthServiceService } from './../services/auth-service.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/components/common/api';
import { ToastrService } from 'ngx-toastr';
import { Professor } from '../model';
import { FormGroup, FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  dadosAcesso: any;
  isLogado = false;
  prof = new Professor;
  dados = true;
  serv = false;

  constructor(
    private authService: AuthServiceService,
    private toastr: ToastrService,
    private userService: UserServiceService,
  ) {
    this.authService.isLogado().subscribe((data) => {
      if(data != null) {
        console.log(data);
        this.dadosAcesso = data;
        this.isLogado = true;
        
        this.userService.buscarDados(data.uid).subscribe((dados: Professor) => {
          console.log(dados);
          if (dados) {
            this.prof.id = dados.id;
            this.prof.nome = dados.nome;
            this.prof.email = data.uid;
            this.prof.urlImg = data.photoURL;
            this.prof.descricao = dados.descricao;
            this.prof.valor = dados.valor;
            this.prof.telefone = dados.telefone;
            this.prof.profissao = dados.profissao;
          }
          this.createForm();
          
        });
      } else { this.isLogado = false; }
    });
  }
  
  ngOnInit() {
  }

  createForm() {
    console.log(this.prof);
    this.form = new FormGroup({

      nome: new FormControl(this.prof.nome, [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(20)
      ]),
      
      telefone: new FormControl(this.prof.telefone, [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(11)
      ]),
  
      profissao: new FormControl(this.prof.profissao, [
        
        Validators.minLength(5),
        Validators.maxLength(25)
      ]),

      descricao: new FormControl(this.prof.descricao, [
       
        Validators.minLength(10),
        Validators.maxLength(200)
      ]),

      valor: new FormControl(this.prof.valor, [
       
        Validators.min(0),
        Validators.max(99999)
      ])
    });
  }

  login() {
    this.authService.login().then(data =>
      this.toastr.success('Você esta logado!.', 'Logado com sucesso.', { positionClass: 'toast-top-center'}))
    .catch(error => console.error(error));
  }

  salvar() {
    console.log(this.prof);
    this.prof.id = this.dadosAcesso.uid;
    this.prof.urlImg = this.dadosAcesso.photoURL;
    this.prof.email = this.dadosAcesso.email;
    this.prof.nome = this.form.value.nome;
    this.prof.telefone = this.form.value.telefone;
    this.prof.descricao = this.form.value.descricao;
    this.prof.valor = this.form.value.valor;
    this.prof.profissao = this.form.value.profissao;

    this.userService.salvarDados(this.prof).then(() => {
      this.toastr.info('Dados Salvo', 'Salvo com sucesso.', { positionClass: 'toast-top-center'});
    })
    .catch(error => console.error(error));
  }
}
