import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UtilsService } from './utils.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseUrlApi = '';
  private userSource = new BehaviorSubject<any>(null);
  currentUser$ = this.userSource.asObservable();

  constructor(
    private http: HttpClient,
    private router: Router,
    private utiusService: UtilsService
  ) {
    let hostServer = utiusService.get_host_server_local();

    if (hostServer.indexOf(':') !== -1) {
      hostServer = hostServer.split(':')[0];
    }

    this.baseUrlApi = 'http://' + hostServer + ':8080';

    // já carrega do localStorage se existir
    const savedUser = localStorage.getItem('userInfo');
    if (savedUser) {
      this.userSource.next(JSON.parse(savedUser));
    }
  }

  get_info_user(username: string) {
    const token = localStorage.getItem('token'); // pega o token
    console.log(token)
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    return this.http.get(this.baseUrlApi + '/barbeiro/' + username, { headers });
  }

  // seta usuário e dispara para quem estiver ouvindo
  setUser(user: any) {
    localStorage.setItem('userInfo', JSON.stringify(user));
    this.userSource.next(user);
  }

  clearUser() {
    localStorage.removeItem('userInfo');
    this.userSource.next(null);
  }
}
