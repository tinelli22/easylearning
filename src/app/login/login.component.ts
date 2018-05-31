import { AuthServiceService } from './../services/auth-service.service';
import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/components/common/api';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  isLogado = false;
  usuario: any;
  items: MenuItem[];
  
  constructor(
    private authService: AuthServiceService,
    private toastr: ToastrService
  ) {
    this.authService.isLogado().subscribe((data) => {
      if(data != null) {
        console.log(data);
        this.isLogado = true;
      } else { this.isLogado = false; }
    });
   }

  ngOnInit() {
  }

  login() {
    this.authService.login().then(data =>
      this.toastr.success('Você esta logado!.', 'Logado com sucesso.', { positionClass: 'toast-top-center'}))
    .catch(error => console.error(error));
  }
}
