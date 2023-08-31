import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectThreatsComponent } from './project-threats.component';

describe('ProjectThreatsComponent', () => {
  let component: ProjectThreatsComponent;
  let fixture: ComponentFixture<ProjectThreatsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProjectThreatsComponent]
    });
    fixture = TestBed.createComponent(ProjectThreatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
