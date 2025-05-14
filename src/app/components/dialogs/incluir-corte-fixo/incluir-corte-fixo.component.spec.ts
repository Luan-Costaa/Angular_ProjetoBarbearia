import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncluirCorteFixoComponent } from './incluir-corte-fixo.component';

describe('IncluirCorteFixoComponent', () => {
  let component: IncluirCorteFixoComponent;
  let fixture: ComponentFixture<IncluirCorteFixoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IncluirCorteFixoComponent]
    });
    fixture = TestBed.createComponent(IncluirCorteFixoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
