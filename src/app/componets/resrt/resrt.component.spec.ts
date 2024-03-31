import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResrtComponent } from './resrt.component';

describe('ResrtComponent', () => {
  let component: ResrtComponent;
  let fixture: ComponentFixture<ResrtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ResrtComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ResrtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
