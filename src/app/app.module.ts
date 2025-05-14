import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask'; // Importação correta do ngx-mask

import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { AppMaterialModule } from './material/app-material/app-material.module';
import { AgendamentoListComponent } from './components/agendamento-list/agendamento-list.component';
import { MinhaContaComponent } from './components/minha-conta/minha-conta.component';
import { AlterarDiaTrabalhadoComponent } from './components/dialogs/alterar-dia-trabalhado/alterar-dia-trabalhado.component';
import { CortesFixosComponent } from './components/cortes-fixos/cortes-fixos.component';
import { IncluirCorteFixoComponent } from './components/dialogs/incluir-corte-fixo/incluir-corte-fixo.component';
import { ConfirmaAgendamentoComponent } from './components/dialogs/confirma-agendamento/confirma-agendamento.component';
import { SericosComponent } from './components/sericos/sericos.component';
import { CadastrarServicoComponent } from './components/dialogs/cadastrar-servico/cadastrar-servico.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    AgendamentoListComponent,
    MinhaContaComponent,
    AlterarDiaTrabalhadoComponent,
    CortesFixosComponent,
    IncluirCorteFixoComponent,
    ConfirmaAgendamentoComponent,
    SericosComponent,
    CadastrarServicoComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AppMaterialModule,
    // Adicione o NgxMaskModule se você estiver usando diretivas diretamente
    NgxMaskDirective,// Diretiva que você pode usar em seu código, mas não é obrigatório
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule  
  ],
  providers: [
    provideNgxMask(),  // Fornecendo a configuração do ngx-mask
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
