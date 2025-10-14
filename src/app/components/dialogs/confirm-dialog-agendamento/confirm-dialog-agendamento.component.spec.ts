import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmDialogAgendamentoComponent } from './confirm-dialog-agendamento.component';

describe('ConfirmDialogAgendamentoComponent', () => {
  let component: ConfirmDialogAgendamentoComponent;
  let fixture: ComponentFixture<ConfirmDialogAgendamentoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConfirmDialogAgendamentoComponent]
    });
    fixture = TestBed.createComponent(ConfirmDialogAgendamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
