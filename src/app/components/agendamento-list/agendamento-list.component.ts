import { Component } from '@angular/core';
import { DateAdapter, MatNativeDateModule } from '@angular/material/core';
import { Observable } from 'rxjs';
import { BarbeiroService } from 'src/app/services/barbeiro.service';


@Component({
  selector: 'app-agendamento-list',
  templateUrl: './agendamento-list.component.html',
  styleUrls: ['./agendamento-list.component.scss']
})
export class AgendamentoListComponent {
  dataAgenda: Date = new Date;
  diasDaSemana = [ "Domingo", "Segunda Feira", "Terça feira", "Quarta Feira", "Quinta Feira", "Sexta Feira", "Sabado"]
  diaSemana: string;

  agendamentos: Observable<any[]> | undefined; // Agora é um Observable

  //dayOfWeek: string | null = null;

  constructor(
    private dateAdapter: DateAdapter<Date>,
    private barbeiroService: BarbeiroService
  ) {

    this.dateAdapter.setLocale('pt-BR');
    this.diaSemana = this.diasDaSemana[this.dataAgenda.getDay()]
  }

  ngOnInit(): void {
    // A lista de serviços será definida aqui quando o componente for carregado
    this.agendamentos = this.barbeiroService.get_agendamentos_por_dia_da_semana();
    console.log("teste "+ this.agendamentos)
  }

  updateDayOfWeek(data: Date) {
    this.dataAgenda = data;
    this.diaSemana = this.diasDaSemana[this.dataAgenda.getDay()];

  }

  format_horario(horario: string){
    return horario.slice(0, 5);
  }
}
