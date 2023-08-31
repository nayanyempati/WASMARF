import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListSectionsComponent } from './list-sections.component';

describe('ListSectionsComponent', () => {
  let component: ListSectionsComponent;
  let fixture: ComponentFixture<ListSectionsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListSectionsComponent]
    });
    fixture = TestBed.createComponent(ListSectionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
