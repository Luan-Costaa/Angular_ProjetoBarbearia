import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DateAdapter } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { AgendamentoFixo } from 'src/app/domain/agendamento-fixo';
import { Barbeiro } from 'src/app/domain/barbeiro';
import { Horario } from 'src/app/domain/horario';
import { Servico } from 'src/app/domain/servico';
import { BarbeiroService } from 'src/app/services/barbeiro.service';
import { ConfirmaAgendamentoComponent } from '../confirma-agendamento/confirma-agendamento.component';

@Component({
  selector: 'app-incluir-corte-fixo',
  templateUrl: './incluir-corte-fixo.component.html',
  styleUrls: ['./incluir-corte-fixo.component.scss']
})
export class IncluirCorteFixoComponent {
  hoje: Date;
  idBarbeiro: Barbeiro = new Barbeiro;
  horariosDisponiveis: Horario[] = [];

  clienteNomeFormControl = new FormControl('', [Validators.required]);
  clienteTelefoneFormControl = new FormControl('', [Validators.required]);

  formIsValid() {
    return this.clienteNomeFormControl.valid && this.clienteTelefoneFormControl.valid;
  }

  dataFormatada: string = this.formatarData(new Date)
  dataAgenda: Date = new Date;
  diasDaSemana = [ "Domingo", "Segunda-Feira", "Terça-feira", "Quarta-Feira", "Quinta-Feira", "Sexta-Feira", "Sabado"]
  diaSemana: string;

  horario: Horario = new Horario;

  servicos: Servico[] ;
  servicosSelecionados: FormGroup;

  constructor(private _formBuilder: FormBuilder,
    private dateAdapter: DateAdapter<Date>,
    private barbeiroService: BarbeiroService,
    private dialog: MatDialog)
  {
    this.hoje = new Date;
    this.dateAdapter.setLocale('pt-BR');
    this.diaSemana = this.diasDaSemana[this.dataAgenda.getDay()];

    this.servicos = [] //agendamentoService.buscarServicos();

    this.servicosSelecionados = this._formBuilder.group(this.buildServicos());
    //this.openDialog(new Horario)

  }

  formatarData(data: Date){
    const dia = String(data.getDate()).padStart(2, '0');
    const mes = String(data.getMonth() + 1).padStart(2, '0'); // Mês começa do zero, por isso o +1
    const ano = data.getFullYear();

    return `${dia}/${mes}/${ano}`;
  }

  buildServicos() {
    const servicosForm = this.servicos.map(s => ({
      [s.id]: false
    }));


    const initialServicosState = Object.assign({}, ...servicosForm);


    return(initialServicosState);
  }

  listarHorarios(data: Date){
    this.dataAgenda = data;
    this.diaSemana = this.diasDaSemana[this.dataAgenda.getDay()];
    this.dataFormatada = this.formatarData(data);
    this.horariosDisponiveis = []//this.agendamentoService.buscarHorariosDisponiveis(data);

  }

  setHorario(horario: Horario){
    this.horario = horario;
  }

  openDialog(horario: Horario): void {
    let agendamento: AgendamentoFixo = new AgendamentoFixo;

    //agendamento.cabeleireiro = this.idBarbeiro;
    //agendamento.dataAgendamento = this.dataAgenda;
    //agendamento.horario = horario;
    //agendamento.nome = this.clienteNomeFormControl.value;
    //agendamento.telefone = this.clienteTelefoneFormControl.value;
//
    //agendamento.servicos = this.listarServicosSelecionados()


    const dialogRef = this.dialog.open(ConfirmaAgendamentoComponent, {
      width: '100vw',
      maxWidth: '100vw',
      //height: '100vh',
      maxHeight: '100vh',
      panelClass: 'full-screen-dialog',
      data: agendamento
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(".")
    });
  }
}
