import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerListViewComponent } from './manager-list-view.component';

describe('ManagerListViewComponent', () => {
  let component: ManagerListViewComponent;
  let fixture: ComponentFixture<ManagerListViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagerListViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManagerListViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
