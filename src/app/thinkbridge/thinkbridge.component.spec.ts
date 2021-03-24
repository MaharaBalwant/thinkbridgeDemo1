import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThinkbridgeComponent } from './thinkbridge.component';

describe('ThinkbridgeComponent', () => {
  let component: ThinkbridgeComponent;
  let fixture: ComponentFixture<ThinkbridgeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThinkbridgeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThinkbridgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
