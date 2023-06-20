import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleViewPageComponent } from './single-view-page.component';

describe('SingleViewPageComponent', () => {
  let component: SingleViewPageComponent;
  let fixture: ComponentFixture<SingleViewPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SingleViewPageComponent]
    });
    fixture = TestBed.createComponent(SingleViewPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
