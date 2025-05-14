import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastrarServicoComponent } from './cadastrar-servico.component';

describe('CadastrarServicoComponent', () => {
  let component: CadastrarServicoComponent;
  let fixture: ComponentFixture<CadastrarServicoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CadastrarServicoComponent]
    });
    fixture = TestBed.createComponent(CadastrarServicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
