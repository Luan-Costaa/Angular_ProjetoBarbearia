import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultaAgendamentoClienteComponent } from './consulta-agendamento-cliente.component';

describe('ConsultaAgendamentoClienteComponent', () => {
  let component: ConsultaAgendamentoClienteComponent;
  let fixture: ComponentFixture<ConsultaAgendamentoClienteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConsultaAgendamentoClienteComponent]
    });
    fixture = TestBed.createComponent(ConsultaAgendamentoClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
