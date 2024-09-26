import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlterarDiaTrabalhadoComponent } from './alterar-dia-trabalhado.component';

describe('AlterarDiaTrabalhadoComponent', () => {
  let component: AlterarDiaTrabalhadoComponent;
  let fixture: ComponentFixture<AlterarDiaTrabalhadoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AlterarDiaTrabalhadoComponent]
    });
    fixture = TestBed.createComponent(AlterarDiaTrabalhadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
