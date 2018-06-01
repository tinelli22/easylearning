
import { AuthServiceService } from './services/auth-service.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { InfoProfComponent } from './info-prof/info-prof.component';
import { InfoProfModuleModule } from './info-prof/info-prof-module.module';
import { NavbarComponent } from './navbar/navbar.component';
import { InputTextModule } from 'primeng/components/inputtext/inputtext';
import { ButtonModule } from 'primeng/components/button/button';
import { PanelModule } from 'primeng/components/panel/panel';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { QuemSomosComponent } from './quem-somos/quem-somos.component';
import { Routes, RouterModule } from '@angular/router';
import { ProfessoresComponent } from './professores/professores.component';
import { CardModule } from 'primeng/components/card/card';
import { SidebarModule } from 'primeng/components/sidebar/sidebar';
import { DataListModule } from 'primeng/components/datalist/datalist';
import { InputTextareaModule } from 'primeng/components/inputtextarea/inputtextarea';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { LoginComponent } from './login/login.component';
import { MenubarModule } from 'primeng/components/menubar/menubar';
import { CommonModule } from '@angular/common';
import { ToastrModule } from 'ngx-toastr';
import { UserServiceService } from './services/user-service.service';
import { TabMenuModule } from 'primeng/components/tabmenu/tabmenu';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const rotas: Routes = [
  { path: 'quemsomos', component: QuemSomosComponent},
  { path: 'login', component: LoginComponent},
  { path: 'home', component: InfoProfComponent},
  { path: 'profs', component: ProfessoresComponent},
  { path: '**', redirectTo: 'home', pathMatch: 'full'},
];

export const config = {
  apiKey: 'AIzaSyCjsXbz9gofaPdjmYoQWpo-P3C6-w3Un7M',
  authDomain: 'easylearning-20022.firebaseapp.com',
  databaseURL: 'https://easylearning-20022.firebaseio.com',
  projectId: 'easylearning-20022',
  storageBucket: 'easylearning-20022.appspot.com',
  messagingSenderId: '224713868238'
};

@NgModule({
  declarations: [
    AppComponent,
    InfoProfComponent,
    NavbarComponent,
    QuemSomosComponent,
    ProfessoresComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    InfoProfModuleModule,
    InputTextModule,
    ButtonModule,
    PanelModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(rotas),
    CardModule,
    SidebarModule,
    DataListModule,
    InputTextareaModule,
    AngularFireModule.initializeApp(config),
    AngularFireAuthModule,
    AngularFirestoreModule,
    MenubarModule,
    ToastrModule.forRoot(),
    CommonModule,
    TabMenuModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    AuthServiceService,
    UserServiceService,
  ],
  bootstrap: [AppComponent],
  exports: [
    RouterModule
  ]
})
export class AppModule { }
