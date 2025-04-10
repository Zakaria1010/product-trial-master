import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreWelcomeComponent } from './store-welcome.component';

describe('StoreWelcomeComponent', () => {
  let component: StoreWelcomeComponent;
  let fixture: ComponentFixture<StoreWelcomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StoreWelcomeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StoreWelcomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
