import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerEditViewComponent } from './manager-edit-view.component';

describe('ManagerEditViewComponent', () => {
  let component: ManagerEditViewComponent;
  let fixture: ComponentFixture<ManagerEditViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagerEditViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManagerEditViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
