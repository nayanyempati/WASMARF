import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectWeaknessComponent } from './project-weakness.component';

describe('ProjectWeaknessComponent', () => {
  let component: ProjectWeaknessComponent;
  let fixture: ComponentFixture<ProjectWeaknessComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProjectWeaknessComponent]
    });
    fixture = TestBed.createComponent(ProjectWeaknessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
