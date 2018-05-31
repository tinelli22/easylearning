import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../services/auth-service.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  exibindoMenu = false;
  isLogado = false;
  nome = '';
  user: any;
  constructor(
    private authService: AuthServiceService,
    private toastr: ToastrService
  ) {
    this.authService.isLogado().subscribe((data) => {
      if(data != null) {
        console.log(data);
        this.nome = data.displayName;
        this.isLogado = true;

      } else { this.isLogado = false; }
    });
   }

  ngOnInit() {
  }

  sair() {
    this.authService.logout().then(() => {
      this.isLogado = false;
      this.toastr.warning('Deslogado.', 'Deslogado com sucesso.', { positionClass: 'toast-top-center'});
    })
    .catch(error => console.error(error));
    console.log(this.isLogado);
  }


}
