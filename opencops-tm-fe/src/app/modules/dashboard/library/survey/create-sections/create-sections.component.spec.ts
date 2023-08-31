import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSectionsComponent } from './create-sections.component';

describe('CreateSectionsComponent', () => {
  let component: CreateSectionsComponent;
  let fixture: ComponentFixture<CreateSectionsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateSectionsComponent]
    });
    fixture = TestBed.createComponent(CreateSectionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
