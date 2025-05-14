import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AgendamentoListComponent } from './components/agendamento-list/agendamento-list.component';
import { MinhaContaComponent } from './components/minha-conta/minha-conta.component';
import { CortesFixosComponent } from './components/cortes-fixos/cortes-fixos.component';
import { SericosComponent } from './components/sericos/sericos.component';

const routes: Routes = [
  {path:"agendamentos",component:AgendamentoListComponent},
  {path:"minha-conta",component:MinhaContaComponent},
  {path:"servicos",component:SericosComponent},
  {path:"cortes-fixos",component:CortesFixosComponent}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
