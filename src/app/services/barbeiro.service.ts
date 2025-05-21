import { Injectable } from '@angular/core';
import { Barbeiro } from '../domain/barbeiro';
import { AgendamentoFixo } from '../domain/agendamento-fixo';
import { DiaTrabalho } from '../domain/dia-trabalho';
import { Servico } from '../domain/servico';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BarbeiroService {

  constructor(private http: HttpClient,
    private snackBar: MatSnackBar
  ) { }
  baseAPIUrl = "http://localhost:8080";

  barbeiro = new Barbeiro()
  servicos:  Array<Servico> = []
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

  

  getBarbeiro(): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      // 'Authorization': 'Bearer YOUR_TOKEN' // se necessário
    });

    return this.http.get<any>(`${this.baseAPIUrl}/barbeiro/7`, { headers });
  }

  get_agendamentos_por_dia_da_semana(): Observable<any[]>{

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      // Se necessário, adicione cabeçalhos adicionais, como autenticação
      // 'Authorization': 'Bearer YOUR_TOKEN'
    });

    console.log(this.baseAPIUrl + '/agendamentos')

    return this.http.get<any[]>(this.baseAPIUrl + "/agendamentos", { headers });

  }

  update_dia_trabalhado(id_dia_trabalho: Number | null, diaTrabalho : DiaTrabalho){
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    this.http.put(this.baseAPIUrl + '/barbeiro/altera-dia-trabalhado/' + id_dia_trabalho, diaTrabalho, { headers })
      .subscribe({
        next: (response) => {
          this.mostrarMensagem('Parametro alterado com sucesso!', 'success');
        },
        error: (err) => {
          const erroMsg = 'Erro ao alterar trabalho: ' + (err.message || 'Erro desconhecido');
          this.mostrarMensagem(erroMsg, 'error');
        }
      });
  }

  getServicos(): Observable<any[]> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      // Se necessário, adicione cabeçalhos adicionais, como autenticação
      // 'Authorization': 'Bearer YOUR_TOKEN'
    });

    return this.http.get<any[]>(this.baseAPIUrl + '/servico', { headers });
  }

  save_servico(servico: any) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    this.http.post(this.baseAPIUrl + '/servico', servico, { headers })
      .subscribe({
        next: (response) => {
          this.mostrarMensagem('Serviço salvo com sucesso!', 'success');
        },
        error: (err) => {
          const erroMsg = 'Erro ao salvar o serviço: ' + (err.message || 'Erro desconhecido');
          this.mostrarMensagem(erroMsg, 'error');
        }
      });
  }

  
  mostrarMensagem(msg: string, type: string) {
    const snackBarClass = type === 'success' ? 'snack-bar-success' : 'snack-bar-error';

    this.snackBar.open(msg, 'Fechar', {
      duration: 2000, // duração em ms (3 segundos)
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      panelClass: [snackBarClass] // aplica a classe CSS baseada no tipo
    });
  }


}
