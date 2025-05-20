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

@Component({
  selector: 'app-cortes-fixos',
  templateUrl: './cortes-fixos.component.html',
  styleUrls: ['./cortes-fixos.component.scss']
})
export class CortesFixosComponent {
  dataAgenda: Date = new Date;
  diasDaSemana = [ "Domingo", "Segunda Feira", "Terça feira", "Quarta Feira", "Quinta Feira", "Sexta Feira", "Sabado"]
  diaSemana: string;

  barebeiro :Observable<any>;

  agendamentos_fixos: Array<AgendamentoFixo>;

  constructor(
    private dateAdapter: DateAdapter<Date>,
    private barbeiroService: BarbeiroService,
    private dialog: MatDialog,
  ) {

    this.dateAdapter.setLocale('pt-BR');
    this.diaSemana = this.diasDaSemana[this.dataAgenda.getDay()]

    console.log(barbeiroService.build_barbeiro_test())

    this.barebeiro = this.barbeiroService.getBarbeiro()

    this.agendamentos_fixos = [] //this.barebeiro.agendamentos_fixos
    
    
  }

  format_time(time: Time | null){
    if (time != null){
      let h = time.hours
      let m = time.minutes

      return h + ':' + m
    }else{
      return '00:00'
    }
  }

  consultar_agendamento_por_data(dia_semana: Number){
    this.agendamentos_fixos = [] //this.barbeiroService.get_agendamentos_por_dia_da_semana()
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
}
