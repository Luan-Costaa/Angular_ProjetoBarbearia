import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-dialog-agendamento',
  templateUrl: './confirm-dialog-agendamento.component.html',
  styleUrls: ['./confirm-dialog-agendamento.component.scss']
})
export class ConfirmDialogAgendamentoComponent {
  constructor(
    public dialogRef: MatDialogRef<ConfirmDialogAgendamentoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onCancel(): void {
    this.dialogRef.close(false);
  }

  onConfirm(): void {
    this.dialogRef.close(true);
  }
}
