import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BarbeiroService } from 'src/app/services/barbeiro.service';

@Component({
  selector: 'app-cadastrar-servico',
  templateUrl: './cadastrar-servico.component.html',
  styleUrls: ['./cadastrar-servico.component.scss']
})
export class CadastrarServicoComponent implements OnInit {

  formServico: FormGroup;
  isEditMode = false; // indica se é edição ou cadastro

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<CadastrarServicoComponent>,
    private barbeiroService: BarbeiroService,
    @Inject(MAT_DIALOG_DATA) public data: any // serviço para edição
  ) {
    this.formServico = this.fb.group({
      nome: ['', Validators.required],
      valor: [null, [Validators.required, Validators.min(0)]],
      tempoServico: [null, [Validators.required, Validators.min(1)]]
    });
  }

  ngOnInit(): void {
    if (this.data) {
      this.isEditMode = true;
      this.formServico.patchValue(this.data); // preenche o formulário com os dados do serviço
    }
  }

  salvar(): void {
    if (this.formServico.valid) {
      const servico = this.formServico.value;

      if (this.isEditMode) {
        const id_servico = this.data.id
        const servicoJSON = JSON.stringify(servico, null, 2); 
        this.barbeiroService.alterar_servico(servicoJSON, id_servico);
        this.dialogRef.close(); // fecha o diálogo retornando os dados alterados
      } else {
        // Cadastro normal
        const servicoJSON = JSON.stringify(servico, null, 2);
        this.barbeiroService.save_servico(servicoJSON); // mantém seu método original
        this.dialogRef.close();
      }
    }
  }
}
