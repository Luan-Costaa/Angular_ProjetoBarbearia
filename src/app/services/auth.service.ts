import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UtilsService } from './utils.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = ''

  token = ''

  constructor(
    private http: HttpClient,
    private router : Router,
    private utiusService: UtilsService

  )
  {
    var hostServer = utiusService.get_host_server_local()

    if (hostServer.indexOf(':') != -1){
      hostServer = hostServer.split(':')[0]
    }

    //this.apiUrl = 'http://'+hostServer+':8080/auth/login';
    this.apiUrl = 'http://localhost:8080/auth/login';

  }

  login(username: string, password: string): Observable<any> {
    const body = { username, password };

    return this.http.post<any>(
      `${this.apiUrl}`, // 👈 ou apenas this.apiUrl, conforme seu endpoint
      body,
      {
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }

  logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
