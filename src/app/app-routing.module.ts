import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AgendamentoListComponent } from './components/agendamento-list/agendamento-list.component';

const routes: Routes = [
  {path:"agendamentos",component:AgendamentoListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
