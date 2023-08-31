import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectWeaknessViewComponent } from './project-weakness-view.component';

describe('ProjectWeaknessViewComponent', () => {
  let component: ProjectWeaknessViewComponent;
  let fixture: ComponentFixture<ProjectWeaknessViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProjectWeaknessViewComponent]
    });
    fixture = TestBed.createComponent(ProjectWeaknessViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
