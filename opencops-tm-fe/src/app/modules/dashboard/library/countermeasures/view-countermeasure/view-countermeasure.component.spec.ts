import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCountermeasureComponent } from './view-countermeasure.component';

describe('ViewCountermeasureComponent', () => {
  let component: ViewCountermeasureComponent;
  let fixture: ComponentFixture<ViewCountermeasureComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewCountermeasureComponent]
    });
    fixture = TestBed.createComponent(ViewCountermeasureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
