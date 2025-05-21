import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BarbeiroService } from 'src/app/services/barbeiro.service';

@Component({
  selector: 'app-cadastrar-servico',
  templateUrl: './cadastrar-servico.component.html',
  styleUrls: ['./cadastrar-servico.component.scss']
})
export class CadastrarServicoComponent {

  formServico: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<CadastrarServicoComponent>,
    private barbeiroService : BarbeiroService,
    
  ) {
    this.formServico = this.fb.group({
      nome: ['', Validators.required],
      valor: [null, [Validators.required, Validators.min(0)]],
      tempoServico: [null, [Validators.required, Validators.min(1)]]
    });
  }

  salvar(): void {
    if (this.formServico.valid) {
      var servico = JSON.stringify(this.formServico.value, null, 2)
      this.barbeiroService.save_servico(servico)

      this.dialogRef.close(this.formServico.value);
    }
  }



}
