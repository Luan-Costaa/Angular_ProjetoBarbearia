import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DateAdapter } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { Horario } from 'src/app/domain/horario';
import { AgendamentoClientService } from 'src/app/services/agendamento-client.service';

@Component({
  selector: 'app-novo-agendamento-cliente',
  templateUrl: './novo-agendamento-cliente.component.html',
  styleUrls: ['./novo-agendamento-cliente.component.scss']
})
export class NovoAgendamentoClienteComponent {
  hoje: Date = new Date();
  dataAgenda: Date = new Date();
  dataFormatada: string = this.formatarData(new Date());
  diaSemana: string;

  barbeiros: Observable<any[]> | undefined;
  servicos: Observable<any[]> | undefined;
  horariosDisponiveis: Horario[] = [];

  idBarbeiro: number | null = null;
  horarioSelecionado: Horario | null = null;

  clienteNomeFormControl = new FormControl('', [Validators.required]);
  clienteTelefoneFormControl = new FormControl('', [Validators.required]);
  servicosSelecionados: FormGroup;

  diasDaSemana = [
    "Domingo",
    "Segunda-Feira",
    "Terça-Feira",
    "Quarta-Feira",
    "Quinta-Feira",
    "Sexta-Feira",
    "Sábado"
  ];

  constructor(
    private formBuilder: FormBuilder,
    private dateAdapter: DateAdapter<Date>,
    private agendamentoService: AgendamentoClientService,
    private dialog: MatDialog
  ) {
    this.dateAdapter.setLocale('pt-BR');
    this.diaSemana = this.diasDaSemana[this.dataAgenda.getDay()];

    this.barbeiros = this.agendamentoService.get_barbeiros_list();
    this.servicos = this.agendamentoService.get_servicos_list();

    this.servicosSelecionados = this.formBuilder.group({});

    // Monta dinamicamente o formGroup de serviços
    this.servicos?.subscribe(servicos => {
      servicos.forEach((servico: any) => {
        this.servicosSelecionados.addControl(servico.id, new FormControl(false));
      });
    });
  }

  /** Verifica se o formulário inicial é válido */
  formIsValid(): boolean {
    return this.clienteNomeFormControl.valid && this.clienteTelefoneFormControl.valid;
  }

  /** Formata data para DD/MM/YYYY */
  formatarData(data: Date): string {
    const dia = String(data.getDate()).padStart(2, '0');
    const mes = String(data.getMonth() + 1).padStart(2, '0');
    const ano = data.getFullYear();
    return `${dia}/${mes}/${ano}`;
  }

  /** Retorna ids dos serviços selecionados */
  filtrarServicosSelecionados(): number[] {
    const selecionados = this.servicosSelecionados.value;
    const ids: number[] = [];

    for (const chave in selecionados) {
      if (selecionados[chave]) {
        ids.push(parseInt(chave, 10));
      }
    }

    return ids;
  }

  /** ✅ Ao alterar a data, monta JSON e busca horários disponíveis */
  listarHorarios(data: Date): void {
    this.dataAgenda = data;
    this.diaSemana = this.diasDaSemana[this.dataAgenda.getDay()];
    this.dataFormatada = this.formatarData(data);

    const dataPesquisa = data.toISOString().split('T')[0];
    const idsServicos = this.filtrarServicosSelecionados();

    const payload = {
      dataPesquisa: dataPesquisa,
      idsServicos: idsServicos.length > 0 ? idsServicos : [0]
    };

    //console.log("📤 Payload enviado:", payload);
    //console.log("💈 ID do barbeiro selecionado:", this.idBarbeiro);

    if (this.idBarbeiro) {
      this.agendamentoService.buscarHorariosDisponiveis(this.idBarbeiro, payload)
        .subscribe({
          next: (response: Horario[]) => {
            this.horariosDisponiveis = response;
            //console.log("📅 Horários disponíveis:", response);
          },
          error: (err) => {
            console.error("Erro ao buscar horários:", err);
          }
        });
    } else {
      console.warn("⚠️ Nenhum barbeiro selecionado!");
      this.horariosDisponiveis = [];
    }
  }

  /** ✅ Define o horário selecionado */
  setHorario(horario: Horario): void {
    this.horarioSelecionado = horario;
  }

  /** ✅ Monta caminho da imagem do barbeiro */
  getSrcImgBarbeiro(nome: string): string {
    return `assets/images/${nome.toLowerCase()}.jpg`;
  }
}
