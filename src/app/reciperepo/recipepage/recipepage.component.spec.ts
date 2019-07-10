import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipepageComponent } from './recipepage.component';

describe('RecipepageComponent', () => {
  let component: RecipepageComponent;
  let fixture: ComponentFixture<RecipepageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecipepageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipepageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
