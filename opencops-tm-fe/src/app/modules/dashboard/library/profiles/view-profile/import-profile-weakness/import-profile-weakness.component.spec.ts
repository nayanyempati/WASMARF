import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportProfileWeaknessComponent } from './import-profile-weakness.component';

describe('ImportProfileWeaknessComponent', () => {
  let component: ImportProfileWeaknessComponent;
  let fixture: ComponentFixture<ImportProfileWeaknessComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ImportProfileWeaknessComponent]
    });
    fixture = TestBed.createComponent(ImportProfileWeaknessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
