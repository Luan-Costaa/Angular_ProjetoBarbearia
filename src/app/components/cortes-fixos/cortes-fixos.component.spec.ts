import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CortesFixosComponent } from './cortes-fixos.component';

describe('CortesFixosComponent', () => {
  let component: CortesFixosComponent;
  let fixture: ComponentFixture<CortesFixosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CortesFixosComponent]
    });
    fixture = TestBed.createComponent(CortesFixosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
