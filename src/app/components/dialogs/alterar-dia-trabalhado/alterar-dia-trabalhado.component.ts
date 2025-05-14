import { Time } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Route, Router } from '@angular/router';
import { DiaTrabalho } from 'src/app/domain/dia-trabalho';
import { BarbeiroService } from 'src/app/services/barbeiro.service';

@Component({
  selector: 'app-alterar-dia-trabalhado',
  templateUrl: './alterar-dia-trabalhado.component.html',
  styleUrls: ['./alterar-dia-trabalhado.component.scss']
})
export class AlterarDiaTrabalhadoComponent {

  dias_semana: string[] = [
    "Domingo",
    "Segunda Feira",
    "Terça Feira",
    "Quarta Feira",
    "Quinta Feira",
    "Sexta Feira",
    "Sábado",
  ];

  id_barbeiro: Number | null = null

  diaTrabalho = new DiaTrabalho()

  horarioInicalFormControl = new FormControl('', [Validators.required]);
  horarioFinalFormControl = new FormControl('', [Validators.required]);
  horarioAlmocoFormControl = new FormControl('', [Validators.required]);
  duracaoAlmocoFormControl = new FormControl('', [Validators.required]);

  constructor( 
    @Inject(MAT_DIALOG_DATA) public data: Array<any>,
    private barbeiroService: BarbeiroService,
    private dialogRef: MatDialogRef<AlterarDiaTrabalhadoComponent>
  ){
    this.id_barbeiro = Number(data[0])
    this.diaTrabalho = data[1]

    this.horarioInicalFormControl.setValue( this.get_format_horario(this.diaTrabalho.horario_inicial) )
    this.horarioFinalFormControl.setValue(this.get_format_horario(this.diaTrabalho.horario_final))
    this.horarioAlmocoFormControl.setValue(this.get_format_horario(this.diaTrabalho.horario_almoco))
    this.duracaoAlmocoFormControl.setValue(this.convert_to_string(this.diaTrabalho.duracao_almoco))
  } 

  convert_to_string(valor: Number | null): string{
    if (valor != null){
      valor = valor.valueOf()
    }else{
      valor = 0
    }

    return valor.toString()
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

  alterar_dia_trabalho(){
    this.diaTrabalho.horario_inicial = this.format_time(this.horarioInicalFormControl.value)
    this.diaTrabalho.horario_final =   this.format_time(this.horarioFinalFormControl.value)
    this.diaTrabalho.horario_almoco =  this.format_time(this.horarioAlmocoFormControl.value)
    this.diaTrabalho.duracao_almoco =  Number(this.duracaoAlmocoFormControl.value)

    this.barbeiroService.update_dia_trabalhado(this.id_barbeiro, this.diaTrabalho)

    this.dialogRef.close();

  }

  format_time(horario: string | null) : Time{
    if (horario == null){
      horario = "00:00"
    }

    var horas = Number(horario.split(":")[0])
    var minutos = Number(horario.split(":")[2])

    return {hours :horas, minutes :minutos}
  }
}
