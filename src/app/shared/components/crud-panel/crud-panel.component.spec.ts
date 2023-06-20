import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudPanelComponent } from './crud-panel.component';

describe('CrudPanelComponent', () => {
  let component: CrudPanelComponent;
  let fixture: ComponentFixture<CrudPanelComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CrudPanelComponent]
    });
    fixture = TestBed.createComponent(CrudPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
