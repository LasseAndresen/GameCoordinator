import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LaUiLibComponent } from './la-ui-lib.component';

describe('LaUiLibComponent', () => {
  let component: LaUiLibComponent;
  let fixture: ComponentFixture<LaUiLibComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LaUiLibComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LaUiLibComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
