import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectCountermeasuresComponent } from './project-countermeasures.component';

describe('ProjectCountermeasuresComponent', () => {
  let component: ProjectCountermeasuresComponent;
  let fixture: ComponentFixture<ProjectCountermeasuresComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProjectCountermeasuresComponent]
    });
    fixture = TestBed.createComponent(ProjectCountermeasuresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
