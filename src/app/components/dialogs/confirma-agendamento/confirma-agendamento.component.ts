import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AgendamentoFixo } from 'src/app/domain/agendamento-fixo';
import { BarbeiroService } from 'src/app/services/barbeiro.service';

@Component({
  selector: 'app-confirma-agendamento',
  templateUrl: './confirma-agendamento.component.html',
  styleUrls: ['./confirma-agendamento.component.scss']
})
export class ConfirmaAgendamentoComponent {
  constructor(public dialogRef: MatDialogRef<ConfirmaAgendamentoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: AgendamentoFixo,
    private barbeiroService: BarbeiroService,
    private dialog: MatDialog,
    private router: Router
    ){
      
    
    }

    
    diasDaSemana = [ "Domingo", "Segunda-Feira", "Terça-feira", "Quarta-Feira", "Quinta-Feira", "Sexta-Feira", "Sabado"]

    dataSemana =  this.diasDaSemana[0]


    dataFormatada = this.data.dia_da_semana

    telFormatado: string = this.formatarTelefone(this.data.tel_cliente)

    formatarTelefone( fone: string | null){
      if (fone != null){
        return "("
      + fone[0] + fone[1] + ") " + fone[2] + " " +
      fone[3] + fone[4] + fone[5] + fone[6] + "-" +
      fone[7] + fone[8] + fone[9] + fone[10] 
      }else{
        return ""
      }
      
    }

    //tempoTotal = this.getTempoTotal()
    //valorTotal = this.getValorTotal()

    formatarData(data: Date){
     
      const dia = String(data.getDate()).padStart(2, '0');
      const mes = String(data.getMonth() + 1).padStart(2, '0'); // Mês começa do zero, por isso o +1
      const ano = data.getFullYear();
  
      return `${dia}/${mes}/${ano}`;
    }

    confirmarAgendamento(){
      //this.agendamentoService.adicionarAgendamento(this.data)
      //
      //const dialogRef = this.dialog.open(ValidaAgendamentoComponent, {
      //  data: this.dataFormatada
      //})
//
      //// Ouvir o fechamento do diálogo
      //dialogRef.afterClosed().subscribe(result => {
      //  if (result === true) { // Se o botão "Visualizar" foi clicado
      //    this.router.navigate(['/agendamentos']); // Redirecionar para /agendamentos
      //  }
      //});
      alert('Teste')
    }
    
}

