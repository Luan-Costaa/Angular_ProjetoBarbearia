import { Dialog } from '@angular/cdk/dialog';
import { Time } from '@angular/common';
import { Component } from '@angular/core';
import { DateAdapter } from '@angular/material/core';
import { AgendamentoFixo } from 'src/app/domain/agendamento-fixo';
import { Barbeiro } from 'src/app/domain/barbeiro';
import { BarbeiroService } from 'src/app/services/barbeiro.service';
import { IncluirCorteFixoComponent } from '../dialogs/incluir-corte-fixo/incluir-corte-fixo.component';
import { MatDialog } from '@angular/material/dialog';
import { Horario } from 'src/app/domain/horario';
import { Observable } from 'rxjs';
import { AgendamentoClientService } from 'src/app/services/agendamento-client.service';

@Component({
  selector: 'app-cortes-fixos',
  templateUrl: './cortes-fixos.component.html',
  styleUrls: ['./cortes-fixos.component.scss']
})
export class CortesFixosComponent {
  diasDaSemana = [ "Domingo", "Segunda Feira", "Terça feira", "Quarta Feira", "Quinta Feira", "Sexta Feira", "Sabado"]

  agendamentos: Observable<any[]> | undefined;

  constructor(
    private dateAdapter: DateAdapter<Date>,
    private barbeiroService: BarbeiroService,
    private dialog: MatDialog,
    private agendamentoClientService : AgendamentoClientService
  ) {

    this.dateAdapter.setLocale('pt-BR');
  }

  ngOnInit(): void {
    // A lista de serviços será definida aqui quando o componente for carregado
    this.agendamentos = this.barbeiroService.get_agendamentos_fixos_por_dia_da_semana(0);
  }

  format_horario(horario: string){
    return horario.slice(0, 5);
  }

  consultar_agendamento_por_data(dia_semana: Number){
    this.agendamentos = this.barbeiroService.get_agendamentos_fixos_por_dia_da_semana(Number(dia_semana));
  }

  openDialog(): void {
    let agendamento: AgendamentoFixo = new AgendamentoFixo;

    //agendamento.cabeleireiro = this.idBarbeiro;
    //agendamento.dataAgendamento = this.dataAgenda;
    //agendamento.horario = horario;
    //agendamento.nome = this.clienteNomeFormControl.value;
    //agendamento.telefone = this.clienteTelefoneFormControl.value;
//
    //agendamento.servicos = this.listarServicosSelecionados()


    const dialogRef = this.dialog.open(IncluirCorteFixoComponent, {
      width: '100vw',
      maxWidth: '100vw',
      height: '80vh',
      maxHeight: '100vh',
      panelClass: 'full-screen-dialog',
      data: agendamento
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(".")
    });
  }

  excluirAgendamento(idAgendamento: any){
    this.agendamentoClientService.excluirAgendamento(idAgendamento)
  }

}
