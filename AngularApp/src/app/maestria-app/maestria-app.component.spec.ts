import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaestriaAppComponent } from './maestria-app.component';

describe('MaestriaAppComponent', () => {
  let component: MaestriaAppComponent;
  let fixture: ComponentFixture<MaestriaAppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaestriaAppComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaestriaAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
