import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSubsectionsComponent } from './view-subsections.component';

describe('ViewSubsectionsComponent', () => {
  let component: ViewSubsectionsComponent;
  let fixture: ComponentFixture<ViewSubsectionsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewSubsectionsComponent]
    });
    fixture = TestBed.createComponent(ViewSubsectionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
