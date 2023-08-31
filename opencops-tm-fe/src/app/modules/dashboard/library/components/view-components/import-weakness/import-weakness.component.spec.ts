import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportWeaknessComponent } from './import-weakness.component';

describe('ImportWeaknessComponent', () => {
  let component: ImportWeaknessComponent;
  let fixture: ComponentFixture<ImportWeaknessComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ImportWeaknessComponent]
    });
    fixture = TestBed.createComponent(ImportWeaknessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
