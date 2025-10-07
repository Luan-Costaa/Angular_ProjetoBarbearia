import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NovoAgendamentoClienteComponent } from './novo-agendamento-cliente.component';

describe('NovoAgendamentoClienteComponent', () => {
  let component: NovoAgendamentoClienteComponent;
  let fixture: ComponentFixture<NovoAgendamentoClienteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NovoAgendamentoClienteComponent]
    });
    fixture = TestBed.createComponent(NovoAgendamentoClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
