import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportProjectComponentsComponent } from './import-project-components.component';

describe('ImportProjectComponentsComponent', () => {
  let component: ImportProjectComponentsComponent;
  let fixture: ComponentFixture<ImportProjectComponentsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ImportProjectComponentsComponent]
    });
    fixture = TestBed.createComponent(ImportProjectComponentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
