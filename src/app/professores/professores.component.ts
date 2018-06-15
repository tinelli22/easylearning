import { FormGroup, FormControl, Validators } from '@angular/forms';

import { AuthServiceService } from './../services/auth-service.service';
import { UserServiceService } from './../services/user-service.service';
import { Component, OnInit } from '@angular/core';
import { Professor } from '../model';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-professores',
  templateUrl: './professores.component.html',
  styleUrls: ['./professores.component.css']
})
export class ProfessoresComponent implements OnInit {

  professores = [];
  endpoint = 'https://us-central1-easylearning-20022.cloudfunctions.net/httpEmail';
  id = '';
  isLogado = false;
  display = false;
  form: FormGroup;
  prof = new Professor;

  constructor(
    private uService: UserServiceService,
    private authService: AuthServiceService,
    private toastr: ToastrService,
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.uService.getAllProfs().subscribe((data: Professor[]) => {
      console.log(data);
      this.professores = data;
     
      this.authService.isLogado().subscribe((user) => {
        if(user != null) {
            this.id = user.uid;
            this.isLogado = true;
          }
      });
    });
    this.createForm();
  }


  showDialog(prof) {
    this.display = true;
    this.prof = prof;
    console.log(prof);
    console.log(this.prof);
  }

  agendarAula() {
    console.log(this.prof);
    console.log(this.form.value);

    const requisitante = {
      nome: this.form.value.nome,
      email: this.form.value.email,
      telefone: this.form.value.telefone,
      redeSocial: this.form.value.redeSocial,
      dataReq: new Date
    };

    console.log(requisitante);

    this.uService.agendar(this.prof, requisitante).then(() => {
      this.toastr.success('O professor entrará em contato.', 'Aula Agendada', { positionClass: 'toast-bottom-center', timeOut: 7000});
    })
    .catch(() => {
      this.toastr.error('Tente novamente.', 'Erro.', { positionClass: 'toast-bottom-center'});
    });

  }

  private createForm() {
   
    this.form = new FormGroup({

      nome: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(20)
      ]),
      
      telefone: new FormControl('', [
        Validators.required,
     
      ]),
      
      email: new FormControl('', [
        Validators.required,
       
      ]),
    
      redeSocial: new FormControl('', [
        Validators.required
      ])
    });
  }
}
