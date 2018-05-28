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


const rotas: Routes = [
  { path: 'quemsomos', component: QuemSomosComponent},
  { path: 'home', component: InfoProfComponent},
  { path: 'profs', component: ProfessoresComponent},
  { path: '**', redirectTo: 'home', pathMatch: 'full'},
];

@NgModule({
  declarations: [
    AppComponent,
    InfoProfComponent,
    NavbarComponent,
    QuemSomosComponent,
    ProfessoresComponent
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
    InputTextareaModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  exports: [
    RouterModule
  ]
})
export class AppModule { }
