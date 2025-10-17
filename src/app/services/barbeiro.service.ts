import { Injectable } from '@angular/core';
import { Barbeiro } from '../domain/barbeiro';
import { AgendamentoFixo } from '../domain/agendamento-fixo';
import { DiaTrabalho } from '../domain/dia-trabalho';
import { Servico } from '../domain/servico';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class BarbeiroService {

  constructor(private http: HttpClient,
    private snackBar: MatSnackBar,
    private router: Router
  ) { }
  baseAPIUrl = "http://localhost:8080";
  token = localStorage.getItem('token');


  getBarbeiro(): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token}`

      // 'Authorization': 'Bearer YOUR_TOKEN' // se necessário
    });

    return this.http.get<any>(`${this.baseAPIUrl}/barbeiro/7`, { headers });
  }

  get_agendamentos_por_dia_da_semana(data_for_request: string | null): Observable<any[]>{

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token}`

    });

    return this.http.get<any[]>(this.baseAPIUrl + "/agendamentos/" + data_for_request, { headers });

  }

  get_agendamentos_fixos_por_dia_da_semana(diasDaSemana : number ): Observable<any[]>{

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token}`

    });

    return this.http.get<any[]>(this.baseAPIUrl + "/agendamentos/fixo/" + diasDaSemana, { headers });

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
      'Authorization': `Bearer ${this.token}`

      // Se necessário, adicione cabeçalhos adicionais, como autenticação
      // 'Authorization': 'Bearer YOUR_TOKEN'
    });

    return this.http.get<any[]>(this.baseAPIUrl + '/servico', { headers });
  }

  alterar_servico(servico: any, id_servico: any){
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    this.http.put(this.baseAPIUrl + '/servico/' + id_servico, servico, { headers })
      .subscribe({
        next: (response) => {
          this.mostrarMensagem('Serviço alterado com sucesso!', 'success');
        },
        error: (err) => {
          const erroMsg = 'Erro ao alterar o serviço: ' + (err.message || 'Erro desconhecido');
          this.mostrarMensagem(erroMsg, 'error');
        }
      });
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

  deletar_servico(id: any) {
  const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  this.http.delete(this.baseAPIUrl + '/servico/' + id, { headers, observe: 'response' })
    .subscribe({
      next: (response) => {
        Swal.fire({
          icon: 'success',
          title: 'Agendamento realizado!',
          text: '✅ Seu agendamento foi confirmado com sucesso.',
          timer: 2000,
          showConfirmButton: false
        })
      },
      error: (err) => {
        let erroMsg = 'Erro ao deletar o serviço.';

        // Se o back-end retornou ExceptionResponse (JSON)
        if (err.error && err.error.message) {
          erroMsg = err.error.message;
        }

        Swal.fire({
          icon: 'error',
          title: 'Erro ao alterar serviço',
          text: 'Tente novamente mais tarde',
          timer: 2000,
          showConfirmButton: false
        })
      }
    });
  }
}
