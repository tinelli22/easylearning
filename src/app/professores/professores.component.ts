import { AuthServiceService } from './../services/auth-service.service';
import { UserServiceService } from './../services/user-service.service';
import { Component, OnInit } from '@angular/core';
import { Professor } from '../model';

@Component({
  selector: 'app-professores',
  templateUrl: './professores.component.html',
  styleUrls: ['./professores.component.css']
})
export class ProfessoresComponent implements OnInit {

  professores = [];

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
  ) { }

  ngOnInit() {
    this.uService.getAllProfs().subscribe((data: Professor[]) => {
      console.log(data);
      this.professores = data;
    });

  }

}
