import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DateAdapter } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { Horario } from 'src/app/domain/horario';
import { AgendamentoClientService } from 'src/app/services/agendamento-client.service';
import { ConfirmDialogAgendamentoComponent } from '../../dialogs/confirm-dialog-agendamento/confirm-dialog-agendamento.component';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

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

  /** FLAGS DE CONTROLE DE PASSOS */
  flag_clientePreenchido = false;
  flag_barbeiroSelecionado = false;
  flag_servicosSelecionados = false;

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
    private dialog: MatDialog,
    private router: Router,
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

    // Atualiza flag do cliente automaticamente quando algo muda
    this.clienteNomeFormControl.valueChanges.subscribe(() => this.atualizarFlagCliente());
    this.clienteTelefoneFormControl.valueChanges.subscribe(() => this.atualizarFlagCliente());
  }

  /** Atualiza flag do cliente */
  atualizarFlagCliente() {
    this.flag_clientePreenchido = !!this.clienteNomeFormControl.value && !!this.clienteTelefoneFormControl.value;
    if (!this.flag_clientePreenchido) {
      this.idBarbeiro = null;
      this.flag_barbeiroSelecionado = false;
      this.servicosSelecionados.reset();
      this.flag_servicosSelecionados = false;
      this.horariosDisponiveis = [];
    }
  }

  /** Atualiza flag do barbeiro */
  selecionarBarbeiro(id: number) {
    if (!this.flag_clientePreenchido) return; // evita selecionar antes do cliente
    this.idBarbeiro = id;
    this.flag_barbeiroSelecionado = !!id;
    this.horariosDisponiveis = [];
  }

  /** Atualiza flag dos serviços */
  atualizarFlagServicos() {
    this.flag_servicosSelecionados = this.filtrarServicosSelecionados().length > 0;
    if (!this.flag_servicosSelecionados) {
      this.horariosDisponiveis = [];
    }
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

  /** Ao alterar a data, monta JSON e busca horários disponíveis */
  listarHorarios(data: Date): void {
    if (this.filtrarServicosSelecionados().length > 0){
      this.flag_servicosSelecionados =  true
    }

    if (this.idBarbeiro) {
      this.flag_barbeiroSelecionado = true
    }


    if (this.flag_servicosSelecionados && this.flag_barbeiroSelecionado && this.flag_clientePreenchido){
      this.dataAgenda = data;
      this.diaSemana = this.diasDaSemana[this.dataAgenda.getDay()];
      this.dataFormatada = this.formatarData(data);

      const dataPesquisa = data.toISOString().split('T')[0];
      const idsServicos = this.filtrarServicosSelecionados();

      const payload = {
        dataPesquisa: dataPesquisa,
        idsServicos: idsServicos.length > 0 ? idsServicos : [0]
      };

      if (this.idBarbeiro) {
        this.agendamentoService.buscarHorariosDisponiveis(this.idBarbeiro, payload)
          .subscribe({
            next: (response: Horario[]) => {
              this.horariosDisponiveis = response;
            },
            error: (err) => {
              console.error("Erro ao buscar horários:", err);
            }
          });
      } else {
        this.horariosDisponiveis = [];
      }
    }else{
      console.log(this.flag_servicosSelecionados)
        if (!this.flag_servicosSelecionados){
          Swal.fire({
              icon: 'error',
              title: 'Erro ao agendar',
              text: 'Selecione no minimo um serviço!',
              showConfirmButton: true
            });
        }else if (!this.flag_barbeiroSelecionado){
          Swal.fire({
              icon: 'error',
              title: 'Erro ao agendar',
              text: 'Selecione o Barbeiro!',
              showConfirmButton: true
            });
        }else{
          Swal.fire({
              icon: 'error',
              title: 'Erro ao agendar',
              text: 'Informe seu nome e telefone!',
              showConfirmButton: true
            });
        }
    }

  }

  /** ✅ Define o horário selecionado */
  setHorario(horario: Horario): void {
    if (!this.flag_servicosSelecionados) return; // bloqueia clique se serviços não selecionados
    this.horarioSelecionado = horario;
  }

  /** ✅ Confirma agendamento */
  confirmarAgendamento(): void {
    if (!this.horarioSelecionado || !this.idBarbeiro) {
      Swal.fire({
        icon: 'warning',
        title: 'Selecione um barbeiro e horário',
        text: 'Antes de confirmar o agendamento, selecione um barbeiro e um horário.'
      });
      return;
    }

    const servicosSelecionadosIds = this.filtrarServicosSelecionados();

    const dataEnvio = {
      dataAgendamento: this.dataAgenda.toISOString().split('T')[0],
      nomeCliente: this.clienteNomeFormControl.value,
      telefoneCliente: this.clienteTelefoneFormControl.value,
      barbeiro_id: this.idBarbeiro,
      servicos_ids: servicosSelecionadosIds,
      idHoraAgendada: this.horarioSelecionado.id
    };

    const dialogRef = this.dialog.open(ConfirmDialogAgendamentoComponent, {
      width: '400px',
      data: {
        ...dataEnvio,
        nomeBarbeiro: (this.barbeiros as any)?._value?.find((b: any) => b.id === this.idBarbeiro)?.nome,
        horario: this.horarioSelecionado.hora,
        servicosNomes: (this.servicos as any)?._value
          ?.filter((s: any) => servicosSelecionadosIds.includes(s.id))
          .map((s: any) => s.nome)
      }
    });

    dialogRef.afterClosed().subscribe((confirmado) => {
      if (confirmado) {
        this.agendamentoService.criarAgendamento(dataEnvio).subscribe({
          next: () => {
            Swal.fire({
              icon: 'success',
              title: 'Agendamento realizado!',
              text: '✅ Seu agendamento foi confirmado com sucesso.',
              timer: 2000,
              showConfirmButton: false
            }).then(() => {
              this.router.navigate(['/consulta-agendamentos']);
            });
          },
          error: (err) => {
            Swal.fire({
              icon: 'error',
              title: 'Erro ao agendar',
              text: '❌ Não foi possível confirmar seu agendamento. Tente novamente.',
              showConfirmButton: true
            });
            console.error('Erro ao criar agendamento:', err);
          }
        });
      }
    });
  }

  /** ✅ Monta caminho da imagem do barbeiro */
  getSrcImgBarbeiro(nome: string): string {
    return `assets/images/${nome.toLowerCase()}.jpg`;
  }
}
