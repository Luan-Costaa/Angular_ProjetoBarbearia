import { DatePipe } from '@angular/common';
import { ThisReceiver } from '@angular/compiler';
import { Component } from '@angular/core';
import { DateAdapter, MatNativeDateModule } from '@angular/material/core';
import { Observable } from 'rxjs';
import { BarbeiroService } from 'src/app/services/barbeiro.service';


@Component({
  selector: 'app-agendamento-list',
  templateUrl: './agendamento-list.component.html',
  styleUrls: ['./agendamento-list.component.scss'],
  providers: [DatePipe] 
})
export class AgendamentoListComponent {
  dataAgenda: Date = new Date;
  diasDaSemana = [ "Domingo", "Segunda Feira", "Terça feira", "Quarta Feira", "Quinta Feira", "Sexta Feira", "Sabado"]
  diaSemana: string;

  agendamentos: Observable<any[]> | undefined; // Agora é um Observable

  //dayOfWeek: string | null = null;

  constructor(
    private dateAdapter: DateAdapter<Date>,
    private barbeiroService: BarbeiroService,
    private datePipe: DatePipe
  ) {

    this.dateAdapter.setLocale('pt-BR');
    this.diaSemana = this.diasDaSemana[this.dataAgenda.getDay()]
  }

  ngOnInit(): void {
    let data_for_request = this.datePipe.transform(this.dataAgenda, 'yyyy-MM-dd')
   
    this.agendamentos = this.barbeiroService.get_agendamentos_por_dia_da_semana(data_for_request);
  }

  updateDayOfWeek(data: Date) {   
    this.dataAgenda = data;
    this.diaSemana = this.diasDaSemana[this.dataAgenda.getDay()];

    const data_for_request = this.datePipe.transform(this.dataAgenda, 'yyyy-MM-dd');

    this.agendamentos = this.barbeiroService.get_agendamentos_por_dia_da_semana(data_for_request);

  }

  format_horario(horario: string){
    return horario.slice(0, 5);
  }

  
}
