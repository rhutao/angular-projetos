import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedAppComponent } from './feed-app.component';

describe('FeedAppComponent', () => {
  let component: FeedAppComponent;
  let fixture: ComponentFixture<FeedAppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeedAppComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
