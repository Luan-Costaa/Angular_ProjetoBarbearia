import { Component } from '@angular/core';
import { DateAdapter, MatNativeDateModule } from '@angular/material/core';


@Component({
  selector: 'app-agendamento-list',
  templateUrl: './agendamento-list.component.html',
  styleUrls: ['./agendamento-list.component.scss']
})
export class AgendamentoListComponent {
  dataAgenda: Date = new Date;
  diasDaSemana = [ "Domingo", "Segunda Feira", "Terça feira", "Quarta Feira", "Quinta Feira", "Sexta Feira", "Sabado"]
  diaSemana: string;

  //dayOfWeek: string | null = null;

  constructor(private dateAdapter: DateAdapter<Date>) {
    this.dateAdapter.setLocale('pt-BR');
    this.diaSemana = this.diasDaSemana[this.dataAgenda.getDay()]  }

  updateDayOfWeek(data: Date) {
    this.dataAgenda = data;
    this.diaSemana = this.diasDaSemana[this.dataAgenda.getDay()];

  }
}
