import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SericosComponent } from './sericos.component';

describe('SericosComponent', () => {
  let component: SericosComponent;
  let fixture: ComponentFixture<SericosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SericosComponent]
    });
    fixture = TestBed.createComponent(SericosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
