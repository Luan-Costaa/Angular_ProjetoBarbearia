import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';

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
}
