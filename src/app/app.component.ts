import { Component } from '@angular/core';
import { BarbeiroService } from './services/barbeiro.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'BarbeariaFront';
  titulo = "Agendamentos";

  barbeiro!: Observable<any>;

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }


  constructor(private barbeiroService: BarbeiroService){
    this.barbeiro = this.barbeiroService.get_dados_minha_conta();
  }

  alterarTituloToolbar(titulo: string){
    this.titulo = titulo;
  }

  logout(){
    localStorage.removeItem('token');
    this.alterarTituloToolbar('Login')
  }


}
