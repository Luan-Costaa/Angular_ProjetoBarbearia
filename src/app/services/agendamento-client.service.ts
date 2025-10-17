import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AgendamentoClientService {

  constructor(private http: HttpClient,
    private snackBar: MatSnackBar
  ) { }
  baseAPIUrl = "http://localhost:8080";


  get_barbeiros_list( ): Observable<any[]>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.get<any[]>(this.baseAPIUrl + "/barbeiro" , { headers });
  }

  get_servicos_list( ): Observable<any[]>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.get<any[]>(this.baseAPIUrl + "/servico" , { headers });
  }

  buscarHorariosDisponiveis(idBarbeiro: number, payload: any){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.post<any[]>(this.baseAPIUrl + "/agendamentos/horariosdisponiveis/" + idBarbeiro, payload , { headers });
  }

  criarAgendamento(payload: any) {
    return this.http.post(this.baseAPIUrl + "/agendamentos", payload);
  }
    tonarAgendamentoFixo(id: any) {
      const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
      this.http.put(this.baseAPIUrl + '/agendamentos/tornar-fixo/' + id, { headers, observe: 'response' })
        .subscribe({
          next: (response) => {
            Swal.fire({
              icon: 'success',
              title: 'Agendamento Fixado!',
              text: '✅ Seu agendamento foi fixado com sucesso.',
              timer: 2000,
              showConfirmButton: false
            })
          },
          error: (err) => {
            let erroMsg = 'Erro ao fixar o agendamento';

            // Se o back-end retornou ExceptionResponse (JSON)
            if (err.error && err.error.mensagem) {
              erroMsg = err.error.mensagem;
            }

            Swal.fire({
              icon: 'error',
              title: 'Erro ao fixar agendamento',
              text: erroMsg,
              timer: 2000,
              showConfirmButton: false
            })
          }
      });
    }

    excluirAgendamento(id: any) {
      const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
      this.http.put(this.baseAPIUrl + '/agendamentos/cancelar/' + id, { headers, observe: 'response' })
        .subscribe({
          next: (response) => {
            Swal.fire({
              icon: 'success',
              title: 'Agendamento Cancelado!',
              text: '✅ Seu agendamento foi cancelado com sucesso.',
              timer: 2000,
              showConfirmButton: false
            })
          },
          error: (err) => {
            let erroMsg = 'Erro ao deletar o agendamento.';

            // Se o back-end retornou ExceptionResponse (JSON)
            if (err.error && err.error.message) {
              erroMsg = err.error.message;
            }

            Swal.fire({
              icon: 'error',
              title: 'Erro ao cancelar agendamento',
              text: erroMsg,
              timer: 2000,
              showConfirmButton: false
            })
          }
      });
    }
}
