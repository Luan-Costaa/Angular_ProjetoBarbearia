import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AgendamentoListComponent } from './components/agendamento-list/agendamento-list.component';
import { MinhaContaComponent } from './components/minha-conta/minha-conta.component';
import { CortesFixosComponent } from './components/cortes-fixos/cortes-fixos.component';
import { SericosComponent } from './components/servicos/sericos.component';
import { HomeClienteComponent } from './components/client/home-cliente/home-cliente.component';
import { NovoAgendamentoClienteComponent } from './components/client/novo-agendamento-cliente/novo-agendamento-cliente.component';
import { ConsultaAgendamentoClienteComponent } from './components/client/consulta-agendamento-cliente/consulta-agendamento-cliente.component';
import { validateHorizontalPosition } from '@angular/cdk/overlay';
import { authGuard } from './guards/auth.guard';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
  {path:"", component:HomeClienteComponent},
  {path:"novo-agendamento", component:NovoAgendamentoClienteComponent},
  {path:"consulta-agendamentos", component:ConsultaAgendamentoClienteComponent},
  {path:"login", component:LoginComponent},
  {path:"agendamentos",component:AgendamentoListComponent , canActivate: [authGuard]},
  {path:"minha-conta",component:MinhaContaComponent, canActivate: [authGuard]},
  {path:"servicos",component:SericosComponent, canActivate: [authGuard]},
  {path:"cortes-fixos",component:CortesFixosComponent, canActivate: [authGuard]}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
