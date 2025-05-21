import { Time } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Route, Router } from '@angular/router';
import { Observable } from 'rxjs';
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

  diaTrabalho: any;

  horarioInicalFormControl = new FormControl('', [Validators.required, Validators.pattern(/^\d{2}:\d{2}$/)]);
  horarioFinalFormControl = new FormControl('', [Validators.required , Validators.pattern(/^\d{2}:\d{2}$/)]);
  horarioAlmocoFormControl = new FormControl('', [Validators.required, Validators.pattern(/^\d{2}:\d{2}$/)]);
  duracaoAlmocoFormControl = new FormControl('', [Validators.required, Validators.pattern(/^\d{2}:\d{2}$/)]);
  trabalhaControl!: FormControl;
  

  constructor(
  @Inject(MAT_DIALOG_DATA) public data: Array<any>,
    private barbeiroService: BarbeiroService,
    private dialogRef: MatDialogRef<AlterarDiaTrabalhadoComponent>
  ) {
    this.diaTrabalho = data;

    this.horarioInicalFormControl.setValue(this.diaTrabalho?.horaInicioDia || '');
    this.horarioFinalFormControl.setValue(this.diaTrabalho?.horaTerminoDia || '');
    this.horarioAlmocoFormControl.setValue(this.diaTrabalho?.horaAlmoco || '');
    this.duracaoAlmocoFormControl.setValue(this.diaTrabalho?.tempoAlmoco || '');

    this.trabalhaControl = new FormControl(this.diaTrabalho?.trabalha ?? true);
  }

  alterar_dia_trabalho(){

    var id_dia_trabalho = this.diaTrabalho.id
   
    this.diaTrabalho.horaInicioDia = this.horarioInicalFormControl.value
    this.diaTrabalho.horaTerminoDia =   this.horarioFinalFormControl.value
    this.diaTrabalho.horaAlmoco =  this.horarioAlmocoFormControl.value
    this.diaTrabalho.tempoAlmoco =  Number(this.duracaoAlmocoFormControl.value)
    this.diaTrabalho.trabalha = this.trabalhaControl.value;

    delete this.diaTrabalho.id;
    delete this.diaTrabalho.diaDaSemana;

    this.barbeiroService.update_dia_trabalhado(id_dia_trabalho, this.diaTrabalho)

    this.dialogRef.close();

  }

}
