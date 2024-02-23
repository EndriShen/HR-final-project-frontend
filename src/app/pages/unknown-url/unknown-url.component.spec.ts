import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnknownUrlComponent } from './unknown-url.component';

describe('UnknownUrlComponent', () => {
  let component: UnknownUrlComponent;
  let fixture: ComponentFixture<UnknownUrlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnknownUrlComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UnknownUrlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
