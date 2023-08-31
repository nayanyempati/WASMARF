import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewClassificationsComponent } from './view-classifications.component';

describe('ViewClassificationsComponent', () => {
  let component: ViewClassificationsComponent;
  let fixture: ComponentFixture<ViewClassificationsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewClassificationsComponent]
    });
    fixture = TestBed.createComponent(ViewClassificationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
