import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CadastrarServicoComponent } from '../dialogs/cadastrar-servico/cadastrar-servico.component';
import { BarbeiroService } from 'src/app/services/barbeiro.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-sericos',
  templateUrl: './sericos.component.html',
  styleUrls: ['./sericos.component.scss']
})
export class SericosComponent {

  servicos: Observable<any[]> | undefined; // Agora é um Observable

  constructor(
    private dialog: MatDialog,
    private barbeiroService: BarbeiroService
  ) {}

  ngOnInit(): void {
    // A lista de serviços será definida aqui quando o componente for carregado
    this.servicos = this.barbeiroService.getServicos();
  }


  abrirCadastroServico(): void {
    const dialogRef = this.dialog.open(CadastrarServicoComponent, {
      width: '90%',
      maxWidth: '600px' // Limite de largura para telas grandes
    });

    // Quando o diálogo for fechado, atualize a lista de serviços
    dialogRef.afterClosed().subscribe(() => {
      this.atualizarListaServicos(); // Atualiza os serviços após o fechamento
    });
  }

  atualizarListaServicos(): void {
    this.servicos = this.barbeiroService.getServicos(); // Atualiza a lista de serviços
  }
}
