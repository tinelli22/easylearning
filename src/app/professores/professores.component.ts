import { Component, OnInit } from '@angular/core';

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

  constructor() { }

  ngOnInit() {
    this.professor.nome = 'Michael'; this.professor.sobrenome = 'Tinelli'; this.professor.img = 'assets/images/mich.jpg';
    this.professor.telefone = '(21) 979207804'; this.professor.telefone2 = '(21) 979207804';
    this.professor.descricao = 'Aulas de programação em Java, C#, Angular e Firebase';
    this.professor.valor = 60.00;
    this.professores.push(this.professor);
  }

}
