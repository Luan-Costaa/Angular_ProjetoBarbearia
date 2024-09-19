import { Component } from '@angular/core';
import { BarbeiroService } from './services/barbeiro.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'BarbeariaFront';
  titulo = "Agendamentos";

  constructor(private barbeiroService: BarbeiroService){
   
  }

  alterarTituloToolbar(titulo: string){
    this.titulo = titulo;
  }
}
