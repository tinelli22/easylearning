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

  professor = {
    nome: '',
    img: '',
    disciplinas: [],
    sobrenome: '',
    telefone: '',
    telefone2: '',
    descricao: '',
    valor: 0,
    redesSociais: []
  };

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
     
    });

  }

  agendarAula(prof: Professor) {
    console.log(prof.id);

    this.authService.isLogado().subscribe((user) => {
      if(user != null) {
        this.uService.buscarDados(user.uid).subscribe((dados: Professor) => {
          this.uService.agendarAula(prof, dados).then(() => {
            this.toastr.success('Aula Agendada!', 'O professor entrará em contato em breve.', { positionClass: 'toast-top-center'});
          
            const data = {
              toEmail: prof.email,
              toName: prof.nome,
              orName: dados.nome,
              orTel: dados.telefone,
              orEmail: dados.email
            };
        
            this.http.post(this.endpoint, data).subscribe();
          })
          
          .catch(() =>  this.toastr.error('Erro ao agendar', 'Tente novamente mais tarde.', { positionClass: 'toast-top-center'}));
        });
      } else {
        this.login();
      }
    });
  }

  

  login() {
    this.authService.login().then(data =>
      this.toastr.success('Você esta logado!.', 'Logado com sucesso.', { positionClass: 'toast-top-center'}))
    .catch(error => console.error(error));
  }

}
