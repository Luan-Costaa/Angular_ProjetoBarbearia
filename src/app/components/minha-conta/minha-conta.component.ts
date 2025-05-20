import { Time } from '@angular/common';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Barbeiro } from 'src/app/domain/barbeiro';
import { BarbeiroService } from 'src/app/services/barbeiro.service';
import { AlterarDiaTrabalhadoComponent } from '../dialogs/alterar-dia-trabalhado/alterar-dia-trabalhado.component';
import { Router } from '@angular/router';
import { DiaTrabalho } from 'src/app/domain/dia-trabalho';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-minha-conta',
  templateUrl: './minha-conta.component.html',
  styleUrls: ['./minha-conta.component.scss']
})
export class MinhaContaComponent {

  barbeiro: Observable<any>; // ✅ Sufixo $ para indicar que é Observable

  dias_semana: string[] = [
    "Domingo",
    "Segunda Feira",
    "Terça Feira",
    "Quarta Feira",
    "Quinta Feira",
    "Sexta Feira",
    "Sábado",
  ];

  constructor(
    private barbeiroService: BarbeiroService,
    private dialog: MatDialog,
    private router: Router
  ) {
    this.barbeiro = this.barbeiroService.getBarbeiro();
  }


  get_format_horario(horario : Time | null){

    if(horario == null){
      return ""
    }

    var horas = horario.hours.toString()
    var minutos = horario.minutes.toString()

    if (minutos == '0'){
      minutos = '00'
    }

    var horario_formatado: string = horas + ":" + minutos 

    return horario_formatado
  }

  alterarDiaTrabalho(id_dia: Number | null){
    alert('teste')
    //var id_barbeiro = this.barbeiro.id
//
    //var dia_trabalho: DiaTrabalho = this.barbeiro.dias_trabalho.filter(
    //  (dia) => dia.id == id_dia
    //)[0]
    //
    //const dialogRef = this.dialog.open(AlterarDiaTrabalhadoComponent, {
    //  width: '100vw',
    //  maxWidth: '430px',
    //  //height: '100vh',
    //  maxHeight: '100vh',
    //  panelClass: 'full-screen-dialog',
    //  data: [id_barbeiro , dia_trabalho ],
    //})
//
    //// Ouvir o fechamento do diálogo
    //dialogRef.afterClosed().subscribe(result => {
//
    //  this.router.navigate(['/minha-conta']); 
  //
    //});
  }
}
