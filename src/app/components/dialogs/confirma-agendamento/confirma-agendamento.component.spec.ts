import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmaAgendamentoComponent } from './confirma-agendamento.component';

describe('ConfirmaAgendamentoComponent', () => {
  let component: ConfirmaAgendamentoComponent;
  let fixture: ComponentFixture<ConfirmaAgendamentoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConfirmaAgendamentoComponent]
    });
    fixture = TestBed.createComponent(ConfirmaAgendamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
