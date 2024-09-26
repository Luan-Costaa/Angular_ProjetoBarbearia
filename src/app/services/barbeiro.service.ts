import { Injectable } from '@angular/core';
import { Barbeiro } from '../domain/barbeiro';
import { AgendamentoFixo } from '../domain/agendamento-fixo';
import { DiaTrabalho } from '../domain/dia-trabalho';
import { Servico } from '../domain/servico';

@Injectable({
  providedIn: 'root'
})
export class BarbeiroService {

  constructor() { }

  barbeiro = new Barbeiro()
  is_created = false

  build_barbeiro_test(){

    if (!this.is_created){
      let barbeiro = new Barbeiro()

      var servicos :Array<Servico> = [
        {id: "1", nome:"Corte", tempo: "30", valor: "35"},
        {id: "1", nome:"Barba", tempo: "20", valor: "20"}
      ]
      
      let agenda_fixa: Array<AgendamentoFixo> = [
        {id: null,dia_da_semana:2,tel_cliente: "11 93591-1872",horario: {hours :15, minutes :30},nome_cliente: "Luan Costa",servicos : servicos, tempo: 50,total: 55},
        {id: null,dia_da_semana:2,tel_cliente: "11 93591-1872",horario: {hours :10, minutes :30},nome_cliente: "Alexandre",servicos : servicos, tempo: 50,total: 55},
        {id: null,dia_da_semana:3,tel_cliente: "11 93591-1872",horario: {hours :18, minutes :30},nome_cliente: "Luan Costa",servicos : servicos, tempo: 50,total: 55},
      ]
  


      let dias_trabalho: Array<DiaTrabalho> = [
        {id: 1, dia_da_semana: 0,trabalha: false, horario_inicial:{hours:8, minutes :0}, duracao_almoco: 30, horario_almoco : {hours :13, minutes:0},horario_final: {hours :18, minutes :0}},
        {id: 2, dia_da_semana: 1,trabalha: true, horario_inicial: {hours :8, minutes :0}, duracao_almoco: 30, horario_almoco : {hours :13, minutes:0},horario_final: {hours :18, minutes :0}},
        {id: 3, dia_da_semana: 2,trabalha: true, horario_inicial: {hours :8, minutes :0}, duracao_almoco: 30, horario_almoco : {hours :13, minutes:0},horario_final: {hours :18, minutes :0}},
        {id: 4, dia_da_semana: 3,trabalha: true, horario_inicial: {hours :8, minutes :0}, duracao_almoco: 30, horario_almoco : {hours :13, minutes:0},horario_final: {hours :18, minutes :0}},
        {id: 5, dia_da_semana: 4,trabalha: true, horario_inicial: {hours :8, minutes :0}, duracao_almoco: 30, horario_almoco : {hours :13, minutes:0},horario_final: {hours :18, minutes :0}},
        {id: 6, dia_da_semana: 5,trabalha: true, horario_inicial: {hours :8, minutes :0}, duracao_almoco: 30, horario_almoco : {hours :13, minutes:0},horario_final: {hours :18, minutes :0}},
        {id: 7, dia_da_semana: 6,trabalha: true, horario_inicial: {hours :8, minutes :0}, duracao_almoco: 30, horario_almoco : {hours :13, minutes:0},horario_final: {hours :18, minutes :0}},

      ]


      barbeiro.id = 1
      barbeiro.nome = "Ademilson"
      barbeiro.email = "ademilson@gmail.com"
      barbeiro.agendamentos_fixos = agenda_fixa
      barbeiro.dias_trabalho = dias_trabalho
      

      this.barbeiro = barbeiro
      this.is_created = true
    }

    
  }

  get_barbeiro(){
    return this.barbeiro
  }

  update_dia_trabalhado(id_barbeiro: Number | null, diaTrabalho : DiaTrabalho){
    for (let trabalho of this.barbeiro.dias_trabalho){
      if (trabalho.id == diaTrabalho.id){
        trabalho = diaTrabalho
      }
    }
  }
}
